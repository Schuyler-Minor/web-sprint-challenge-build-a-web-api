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

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "please provide name and description" });
  } else {
    Projects.insert(project)
      //   .then(([id]) => {
      //     return Projects.get(id);
      //   })
      .then((id) => {
        res.status(201).json(id);
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      await Projects.remove(req.params.id);
      res.json(project);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
