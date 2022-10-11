const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  try{
    const { headers } = req;
    // console.log(headers);
    /* 1. We test if there is an Authorization header in the HTTP request */
    if (!headers?.authorization) { // it's like if if (!headers || !headers.authorization)
      return res.status(401).json({
        error: 'Missing Authorization header'
      });
    }

    /* 2. We test if there is a token in the Authorization token */
    const [type, token] = headers.authorization.split(' ');
    // console.log(type,token);
  
    if (type?.toLowerCase() !== (process.env.ACCESS_TOKEN_TYPE)?.toLowerCase() || !token) {
      return res.status(401).json({
        error: 'Header format is Authorization: Bearer token'
      });
    }

    /* 3.  Test and decode token */ 
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    /*4. Transfer token to next middleware */ 
    req.user = decoded;
  } catch (err) {
      return res.status(401).json({error : "Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;