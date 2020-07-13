let router = require("express").Router();
let Model = require("./model");
let { isEmail } = require("validator");
let { tokenValidator } = require("../Account/token");

router.get("/:id1/:id2", tokenValidator, function(req, res, next) {
  let id1= req.params.id1;
  let id2= req.params.id2;

  Model.select(id1,id2)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.post("/", tokenValidator, function(req, res, next) {
  let allowedFields = ["sec1_id","sec2_id"];
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

router.delete("/", tokenValidator, function(req, res, next) {
  let allowedFields = ["sec1_id","sec2_id"];
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
  Model.remove(patch)
  .then((rows) =>{
    res.status(200).send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 