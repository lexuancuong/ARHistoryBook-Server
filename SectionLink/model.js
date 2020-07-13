let db = require("../configs/db");
let { normaliseString } = require("../configs/type");

let select = (user_id,sec_id) => {
    return db
    .query("SELECT * FROM sectionlink where sec1_id = $1 AND sec2_id = $2", [user_id,sec_id])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows;
    })
    .catch((err) => {
      throw { http: 400, code: "INVALID_ID", message: "Section Status's info of this ID does not exsist"};
    });
}

let remove = (user_id,sec_id) => {
  return db
  .query("DELETE FROM sectionlink where user_id = $1 AND sec_id = $2", [user_id,sec_id])
  .then(function({rows}) {
    return {"status" : "Success"};

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


module.exports = {
    select,
    remove,
    create
};