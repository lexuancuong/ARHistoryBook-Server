let db = require("../configs/db");
let { normaliseString } = require("../configs/type");
let { findIDByUsername } = require("../Account/account.model");
let selectByID = (user_id,sec_id) => {
    return db
    .query("SELECT * FROM sectionstatus where user_id = $1 AND sec_id = $2", [user_id,sec_id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "Section Status's info of this ID does not exsist"};
    });
}

//Create a new User Row
function createSection(patch) {
  let user_id = patch.user_id
  console.log(user_id)
  let modifier = Object.values(patch)
    .map((value) => `'${value}'`)
    .join(", ");
  console.log(modifier)
  return db
    .query(
      `INSERT INTO sectionstatus(user_id,sec_id,status) VALUES (${modifier});`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}

//Update a new User
function updateSection(patch) {
  let user_id = patch.user_id
  let sec_id = patch.sec_id
  delete patch.user_id
  delete patch.sec_id
  let modifier = Object.keys(patch)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");

  console.log("Modifier la:" + modifier)
  console.log(Object.values(patch)  )
  console.log(user_id,sec_id)
  return db
    .query(
      `UPDATE sectionstatus SET ${modifier} WHERE (user_id = ${user_id} AND sec_id = '${sec_id}') RETURNING *;`, 
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
    createSection,
    updateSection
  };