let router = require("express").Router();
let User = require("./user.model");
let { isEmail } = require("validator");
let { tokenValidator } = require("../Account/token");

router.get("/", tokenValidator, function(req, res, next) {
  let { user_id } = req.body;
  User.selectByID(user_id)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.post("/create", tokenValidator, function(req, res, next) {
  let allowedFields = ["user_id", "name", "school", "class", "score","rank","email","phone"];
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
  console.log(1212)
  User.createUser(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 

router.post("/update", tokenValidator, function(req, res, next) {
  let allowedFields = ["user_id", "name", "school", "class", "score","rank","email","phone"];
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
  User.updateUser(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 