// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const Projects = require("./projects-model");
const { requiredBody } = require("./projects-middleware");

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
        res.status(404).json([]);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id/actions", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      const actions = await Projects.getProjectActions(req.params.id);
      res.json(actions);
    }
  } catch (error) {
    res.status(500).json({
      error: "The post information could not be retrieved.",
    });
  }
});

router.post("/", requiredBody, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "please provide name and description" });
  } else {
    Projects.get(req.params.id)
      .then((project) => {
        if (!project) {
          res.status(404).json({ message: "nope" });
        } else {
          return Projects.update(req.params.id, req.body);
        }
      })
      .then((action) => {
        if (action) {
          return Projects.get(req.params.id);
        }
      })
      .then((project) => {
        if (project) {
          res.json(project);
        }
      })
      .catch((err) => {
        console.log(err);
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
