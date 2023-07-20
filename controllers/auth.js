const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema');
const dotenv = require('dotenv')
dotenv.config()
const createError= require('../utils/errorHandler')

exports.registerController = async (req, res,next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return next(createError({status: 404, message:'required field name, email, password'}))
    //res.json('required field name, email, password');
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Store the hashed password instead of the original password
    });

    await newUser.save();
    return res.status(200).json('Registered successfully');
  } catch (err) {
    console.log(err);
    return res.json('server Error');
  }
};


exports.loginController = async (req, res,next) => {
    if(!req.body.email || !req.body.password){
       return res.json('requied field is empty');
    }
    try {
        const user = await User.findOne({ email: req.body.email})
        if(!user){
            return next(createError({status:401, message:"user not found"}))
            //res.json('user not found');
        }
        const compare = bcryptjs.compare(req.body.password,user.password)
        if(!compare){
            return next(createError({status: 404, message:"email/password mismatch"}))
            //res.json('email/password mismatch');
        }
        let token = jwt.sign({ id: user._id,name:user.name }, process.env.SECRETKEY, { expiresIn: "1d" });
        return res.cookie('access_token', token,{
            httpOnly: true,
           }) .status(200).json({message:'Login successful'})

        
    } catch (error) {
        return next(createError({status:500,message:'server error'}))
        //res.json("server error")
     }
}

exports.logoutController = (req,res)=>{
  res.clearCookie('access_token')
return res.json('logout successful')
}

exports.isLoggedInController = (req,res)=>{
  const token = req.cookies.access_token;
  console.log(token)
  if(!token){
    return res.json(false);
  }
  return jwt.verify(token,process.env.SECRETKEY,(err)=>{
    if(err){
      return res.json(false);
    }
    return res.json(true);
  })

}