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
   if(action.project_Id && action.description && action.notes) {

   }
});

module.exports = router;