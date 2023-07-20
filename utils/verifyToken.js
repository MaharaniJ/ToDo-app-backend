// const jwt = require('jsonwebtoken');
// const createError = require('./errorHandler')

// module.exports = (req, res, next) => {
//   const token = req.cookies.access_token;

//   if (!token) {
//     return next(createError({status:404,message:'Unauthorized'}))
//   }

//   jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
//     if (err) {
//       return next(createError({status:401,message:'Invalid token'}))
//     }
    
//     res.user = decoded;
//     next();
//   });
// };


const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded; // Attach the decoded user information to req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateMiddleware;
