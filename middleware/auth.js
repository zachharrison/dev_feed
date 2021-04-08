const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // GET TOKEN FROM HEADER
  const token = req.query['x-auth-token'];

  // CHECK IF THERE IS NOT A TOKEN
  if (!token) {
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  // VERIFY TOKEN
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (error) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
