// add middlewares here related to actions
const Actions = require("../actions/actions-model");

function validateUser(req, res, next) {
  const { description, notes } = req.body;
  if (!description || !notes) {
    res
      .status(400)
      .json({ message: "missing required notes and description field" });
  } else {
    next();
  }
}

function requiredBody(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    next();
  } else {
    res.status(400).json({ message: "request body is required!" });
  }
}

module.exports = {
  validateUser,
  requiredBody,
};
