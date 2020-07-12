let db = require("../configs/db");
let { normaliseString } = require("../configs/type");
let { findIDByUsername } = require("../account/account.model");
let select = (clt_id,arti_id) => {
    return db
    .query("SELECT * FROM collectionartifact where clt_id = $1 AND arti_id = $2; ", [clt_id,arti_id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "User's Info of this ID does not exsist"};
    });
}

let remove = (clt_id,arti_id) => {
  return db
  .query("DELETE FROM collectionartifact where clt_id = $1 AND arti_id = $2; ", [clt_id,arti_id])
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
      `INSERT INTO CollectionArtifact(clt_id,arti_id) VALUES (${modifier});`)
    .then(function({ rows }) {
      return {"status" : "Success"};
    })
    .catch((err) => {throw (err)});
}

//Update a new User
function update(patch) {
  let user_id = patch.clt_id
  let sec_id = patch.arti_id
  delete patch.user_id
  delete patch.sec_id
  let modifier = Object.keys(patch)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");
  return db
    .query(
      `UPDATE CollectionArtifact SET ${modifier} WHERE (clt_id = ${user_id} AND arti_id = '${sec_id}') RETURNING *;`, 
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