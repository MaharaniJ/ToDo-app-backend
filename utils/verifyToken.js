

const jwt = require('jsonwebtoken');

const authenticateMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = { userId: decodedToken.userId };
    // req.user = decoded; // Attach the decoded user information to req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateMiddleware;
