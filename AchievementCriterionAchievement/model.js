let db = require("../configs/db");
let { normaliseString } = require("../configs/type");
let { findIDByUsername } = require("../Account/account.model");
let select = (accrit_id,achv_id) => {
    return db
    .query("SELECT * FROM AchievementCriterionAchievement where accrit_id = $1 AND achv_id = $2; ", [accrit_id,achv_id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "User's Info of this ID does not exsist"};
    });
}

let remove = (accrit_id, achv_id) => {
  return db
  .query("DELETE FROM AchievementCriterionAchievement where accrit_id = $1 AND achv_id = $2; ", [accrit_id,achv_id])
  .then(function({rows}) {
    return {"status" : "Success"};
  })
  .catch((err) => {
    throw { http: 400, code: "INVALID_ID", message: "User's Info of this ID does not exsist"};
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
      `INSERT INTO AchievementCriterionAchievement(accrit_id,achv_id,count) VALUES (${modifier});`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}

//Update a new User
function update(patch) {
  let accrit_id = patch.accrit_id
  let achv_id = patch.achv_id
  delete patch.accrit_id
  delete patch.achv_id
  let modifier = Object.keys(patch)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");
  console.log(modifier)
  console.log(Object.values(patch))

  return db
    .query(
      `UPDATE AchievementCriterionAchievement SET ${modifier} WHERE (accrit_id = '${accrit_id}' AND achv_id = '${achv_id}') RETURNING *;`, 
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
    select, 
    update,
    create,
    remove
  };