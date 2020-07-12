let db = require("../configs/db");
let { normaliseString } = require("../configs/type");
let { findIDByUsername } = require("../Account/account.model");
let select = (user_id,sec_id) => {
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
function create(patch) {
  let user_id = patch.user_id
  console.log(user_id)
  let modifier = Object.values(patch)
    .map((value) => `'${value}'`)
    .join(", ");
  console.log(modifier)
  return db
    .query(
      `INSERT INTO sectionlink(sec1_id,sec2_id) VALUES (${modifier});`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}

//Update a new User
function remove(patch) {
  console.log(Object.values(patch))
  let sec1 = Object.values(patch)[0]
  let sec2 = Object.values(patch)[1]
  console.log(sec1,sec2)
  return db
    .query(`DELETE FROM sectionlink WHERE sec1_id = '${sec1}' AND sec2_id = '${sec2}';`)
    .then(function({ rows }) {
      if (rows.length !== 1) {
        throw { http: 404, code: "NO_USER", message: "Sec_id does not exist" };
      }
      return {"status" : "Success"}
    })
}
module.exports = {
    select,
    remove,
    create
};