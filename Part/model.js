let db = require("../configs/db");
let { normaliseString } = require("../configs/type");
let select = (sec_id) => {
    return db
    .query("SELECT * FROM part where id = $1", [sec_id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "Lesso's Info of this ID does not exsist"};
    });
}

//Create a new User Row
function create(patch) {
  let modifier = Object.values(patch)
    .map((value) => `'${value}'`)
    .join(", ");
  console.log(modifier)
  return db
    .query(`INSERT INTO part(id,name,grade_id) VALUES (${modifier});`)
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

  return db
    .query(
      `UPDATE part SET ${modifier} WHERE id = '${id}' RETURNING *;`,
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
    update
  };