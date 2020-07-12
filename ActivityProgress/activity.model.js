let db = require("../configs/db");
let { normaliseString } = require("../configs/type");
let { findIDByUsername } = require("../account/account.model");
let selectByID = (id) => {
    return db
    .query("SELECT * FROM activityprogress where id = $1", [id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "User's Info of this ID does not exsist"};
    });
}

//Create a new User Row
function createActivity(patch) {
  let user_id = patch.user_id
  console.log(user_id)
  let modifier = Object.values(patch)
    .map((value) => `'${value}'`)
    .join(", ");
  console.log(modifier)
  return db
    .query(
      `INSERT INTO activityprogress(id,score,done,user_id,sec_id) VALUES (${modifier});`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}

//Update a new User
function updateActivity(patch) {
  let id = patch.id
  delete patch.id
  let modifier = Object.keys(patch)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");

  return db
    .query(
      `UPDATE activityprogress SET ${modifier} WHERE id = '${id}' RETURNING *;`, 
      Object.values(patch)
    )
    .then(function({ rows }) {
      if (rows.length !== 1) {
        throw { http: 404, code: "NO_USER", message: "User_id does not exist" };
      }
      return {"status" : "Success"}
    })
}
module.exports = {
    selectByID,
    createActivity,
    updateActivity
  };