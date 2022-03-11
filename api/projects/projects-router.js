// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");

router.get("/", (req, res) => {
  Projects.get(req.query.id)
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "nope" });
    });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((projects) => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({});
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
