let db = require("../configs/db");
let bcrypt = require("bcrypt");
let { normaliseString } = require("../configs/type");
let { findIDByUsername } = require("../account/account.model")
let selectByID = (user_id) => {
    return db
    .query("SELECT * FROM users where user_id = $1", [user_id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "User's Info of this ID does not exsist"};
    });
}

//Create a new User Row
function createUser(patch) {
  let user_id = patch.user_id
  console.log(user_id)
  let modifier = Object.values(patch)
    .map((value) => `'${value}'`)
    .join(", ");
  console.log(modifier)
  return db
    .query(
      `INSERT INTO users(user_id,name,school,rank,class,score,email,phone) VALUES (${modifier});`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}

//Update a new User
function updateUser(patch) {
  console.log('12121212')
  let user_id = patch.user_id

  let modifier = Object.keys(patch)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");
  console.log("asdas" + modifier)
  return db
    .query(
      `UPDATE users SET ${modifier} WHERE user_id=${user_id} RETURNING *`,
      Object.values(patch)
    )
    .then(function({ rows }) {
      if (rows.length !== 1) {
        throw { http: 404, code: "NO_USER", message: "User_id does not exist" };
      }
      return {"status" : "Success"}
    });
}
module.exports = {
    selectByID,
    createUser,
    updateUser
  };