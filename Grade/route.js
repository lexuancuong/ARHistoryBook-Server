let router = require("express").Router();
let Model = require("./model");
let { isEmail } = require("validator");
let { tokenValidator } = require("../Account/token");

router.get("/:id", tokenValidator, function(req, res, next) {
  let id  = req.params.id;
  console.log(id)
  Model.select(id)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.delete("/:id", tokenValidator, function(req, res, next) {
  let id  = req.params.id;
  console.log(id)
  Model.remove(id)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.post("/", tokenValidator, function(req, res, next) {
  let allowedFields = ["id","name"];
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
  Model.create(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 

router.put("/", tokenValidator, function(req, res, next) {
  let allowedFields = ["id","name"];
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
  Model.update(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 