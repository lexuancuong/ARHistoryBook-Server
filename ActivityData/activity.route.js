let router = require("express").Router();
let Activity = require("./activity.model");
let { isEmail } = require("validator");
let { tokenValidator } = require("../Account/token");

router.get("/:id", tokenValidator, function(req, res, next) {
  let id  = req.params.id;
  console.log(id)
  Activity.selectByID(id)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.post("/create", tokenValidator, function(req, res, next) {
  let allowedFields = ["id", "type", "header", "is_required", "max_score","sec_id"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      patch[key] = req.body[key];
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  console.log(patch)
  console.log("Create activity data")
  Activity.createActivity(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 

router.post("/update", tokenValidator, function(req, res, next) {
  let allowedFields = ["id", "type", "header", "is_required", "max_score","sec_id"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      let value = req.body[key];

      //Check type of variable is valid
      if (typeof value === "undefined") {
        return;
      } 
      if (key === "email" && !isEmail(value)) {
        throw "Invalid email";
      }
      if (key === "phone" && value.length !== 10) {
        throw "Invalid phone number";
      }
      patch[key] = value;
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  console.log(patch)
  Activity.updateActivity(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 