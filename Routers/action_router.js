//requires
const actionDb = require("../data/helpers/actionModel.js");
const express = require("express");
const router = express.Router();

//get all actions
router.get("/", (req, res) => {
   actionDb.get()
      .then(actions => {
         actions ? res.json(actions) : res.status(500).json({error: "actions could not be retrieved"})
      })
      .catch(err => { res.status(500).json({error: "actions could not be retrieved"}); });
});

//get actions by id
router.get("/:id", (req, res) => {
   const {id} = req.params;
   actionDb.get(id)
      .then(actions => {
         actions ? res.json(actions) :
         res.status(404).json({error: "actions not found"});
      })
      .catch(err => { res.status(404).json({error: "actions not found"}); });
});

//add action
router.post("/", (req, res) => {
   const action = req.body;
   if(action.project_id && action.description && action.notes) {
      if(action.description.length < 128) {
         actionDb.insert(action)
            .then(action => {
               res.status(201).json(action);
            })
            .catch(err => {
               res.status(500).json({error: "error adding action"});
            })
      } else {
         res.status(400).json({error: "action description must be 128 characters or less"});
      }
   } else {
      res.status(400).json({error: "please provide the description, notes and project id for the action"});
   }
});

//delete action
router.delete("/:id", (req, res) => {
   const {id} = req.params;
   actionDb.remove(id)
   .then(count => {
      count ? res.json({message: "action deleted successfully"}) : res.status(404).json({error: "action does not exist"});
   })
   .catch(err => { res.status(500).json({error: "error removing project"}); });
});

//update action
router.put("/:id", (req, res) => {
   const {id} = req.params;
   const action = req.body;
   if(action.project_id && action.description && action.notes) {
      if(action.description.length < 128) {
         actionDb.update(id, action)
            .then(action => {
               action != null ? res.json(action) : res.status(404).json({error: "action not found"})
            })
            .catch(err => {
               res.status(500).json({error: "error updating action"});
            })
      } else {
         res.status(400).json({error: "action description must be 128 characters or less"});
      }
   } else {
      res.status(400).json({error: "please provide the description, notes and project id for the action"});
   }
});

module.exports = router;