// Write your "actions" router here!
const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");

router.get("/", (req, res) => {
  console.log(req.query.id);
  Actions.get(req.query.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "actions could not be retrieved",
      });
    });
});

module.exports = router;
