//requires
const projectDb = require("../data/helpers/projectModel.js");
const express = require("express");
const router = express.Router();

//get all projects
router.get("/", (req, res) => {
   projectDb.get()
      .then(projects => {
         projects ? res.json(projects) : res.status(500).json({error: "project could not be retrieved"});
      })
      .catch(err => {
         res.status(500).json({error: "project could not be retrieved"});
      });
});

//get project by id
router.get("/:id", (req, res) => {
   const {id} = req.params;
   projectDb.get(id)
      .then(project => {
         project ? res.json(project) : res.status(404).json({error: `the project with id ${id} was not found`});
      })
      .catch(err=> {
         res.status(404).json({error: `the project with id ${id} was not found`});
      });
});

//get project actions by id
router.get("/:id/actions", (req, res) => {
   const {id} = req.params;
   projectDb.getProjectActions(id)
      .then(actions => {
         actions ? res.json(actions) : res.status(400).json({error: "project actions not found"});
      })
      .catch(err => { res.status(404).json({error: "project actions not found"})})
});

//add project
router.post("/", (req, res) => {
   const project = req.body;
   if(project.name && project.description) {
      projectDb.insert(project)
         .then(project => {
            res.status(201).json(project);
         })
         .catch(err => { res.status(500).json({error: "error adding project"}); });
   } else { 
      res.status(400).json({error: "please provide project name and description"}) 
   }
});

//delete project
router.delete("/:id", (req, res) => {
   const {id} = req.params;
   projectDb.remove(id)
      .then(count => {
         count ? res.json({message: "project deleted successfully"}) : res.status(404).json({error: "project does not exist"});
      })
      .catch(err => { res.status(500).json({error: "error removing project"}); });
});

//update project
router.put("/:id", (req, res) => {
   const {id} = req.params;
   const project = req.body;
   if(project.name && project.description) {
      projectDb.update(id, project)
         .then(project => {
            project != null ? res.json(project) : res.status(404).json({error: `a project with the id of ${id} does not exist`})
         })
         .catch(err => {
            res.status(500).json
         })
   } else {
      res.status(400).json({error: "please provide project name and description"})
   }
});

module.exports = router;