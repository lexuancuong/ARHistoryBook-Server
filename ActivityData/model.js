let db = require("../configs/db");
let bcrypt = require("bcrypt");
let { normaliseString } = require("../configs/type");
let select = (id) => {
    return db
    .query("SELECT * FROM activitydata WHERE id = $1", [id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      console.log(rows)
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "User's Info of this ID does not exsist"};
    });
}

let remove = (id) => {
  return db
  .query("DELETE FROM activitydata WHERE id = $1", [id])
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
      `INSERT INTO activitydata(id,type,header,is_required,max_score,sec_id) VALUES (${modifier});`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}

//Update a new User
function update(patch) {
  let id = patch.id
  delete patch.id
  let modifier = Object.keys(patch)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");

  console.log(Object.values(patch))
  return db
    .query(
      `UPDATE activitydata SET ${modifier} WHERE id = '${id}' RETURNING *`,
      Object.values(patch)
    )
    .then(function({ rows }) {
      if (rows.length !== 1) {
        throw { http: 404, code: "NO_USER", message: "Id does not exist" };
      }
      return {"status" : "Success"}
    });
}
module.exports = {
    select,
    create,
    update,
    remove
  };