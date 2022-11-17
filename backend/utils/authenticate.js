const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      ID: decodedToken.ID,
      email: decodedToken.email,
      name: decodedToken.name,
      roleID: decodedToken.roleID,
    };
    next();
  } catch (err) {
    console.log(err);
    return next(new Error("Not able to log you in!"));
  }
};

exports.authenticateLibrarian = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      name: decodedToken.name,
      roleID: decodedToken.roleID,
    };
    next();
  } catch (err) {
    console.log(err);
    return next(new Error("Not able to log you in!"));
  }
};
