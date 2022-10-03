const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  /* 1 Test if token is present in body, query, header */
  const token = req.headers["apitoken"];
  console.log(req.headers);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;