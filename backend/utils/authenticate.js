const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      regNo: decodedToken.regNo,
      email: decodedToken.email,
      name: decodedToken.name,
    };
    next();
  } catch (err) {
    console.log(err);
    return next(new Error("Not able to log you in!"));
  }
};
