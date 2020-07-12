let router = require("express").Router();
let Account = require("./account.model");
let { generateToken, tokenValidator } = require("./token");

router.post("/register", function(req, res, next) {
    //Get Username, password and type in body request that was sent from client
    let { username, password, type} = req.body;
    Account.createAccount(username, password, type)
      .then(function(rows) {
        res.status(201).send({
          ...rows, //Get everything in row
          token: generateToken(username,rows.user_id)
        }); 
      })
      .catch(next);
});

router.post("/login", function(req, res, next) {
  let { username, password } = req.body;
  Account.login(username, password)
    .then(function(user) {
      res.status(200).send({
        token: generateToken(username,user.user_id)
      });
    })
    .catch(next);
});

router.get("/", tokenValidator, function(req, res, next) {
  let { username } = req.body;
  console.log(req.body)
  Account.findByUsername(username)
    .then(function(user) {
      res.status(200).send(user);
    })
    .catch(next);
});

router.put("/update", tokenValidator, function(req, res, next) {
  let { username, password, type} = req.body;
  Account.updateAccount(username,password, type)
    .then(function(user) {
      res.status(200).send(user);
    })
    .catch(next);
});
module.exports = router;
 