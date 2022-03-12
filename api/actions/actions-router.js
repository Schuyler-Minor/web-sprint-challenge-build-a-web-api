// Write your "actions" router here!
const express = require("express");

const { validateUser, requiredBody } = require("./actions-middlware");
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

router.post("/", requiredBody, (req, res, next) => {
  Actions.insert(req.body)
    .then((newAction) => {
      res.status(201).json(newAction);
    })
    .catch(next);
});

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "please provide name and description" });
  } else {
    Actions.get(req.params.id)
      .then((action) => {
        if (!action) {
          res.status(404).json({ message: "nope" });
        } else {
          return Actions.update(req.params.id, req.body);
        }
      })
      .then((action) => {
        if (action) {
          return Actions.get(req.params.id);
        }
      })
      .then((action) => {
        if (action) {
          res.json(action);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
