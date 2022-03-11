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

router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json([]);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      await Actions.remove(req.params.id);
      res.json(action);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
