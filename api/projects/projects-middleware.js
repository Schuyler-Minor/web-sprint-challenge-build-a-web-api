// add middlewares here related to projects

function requiredBody(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    next();
  } else {
    res.status(400).json({ message: "request body is required!" });
  }
}

module.exports = {
  requiredBody,
};
