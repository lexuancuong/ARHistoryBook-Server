let db = require("../configs/db");
let bcrypt = require("bcrypt");
let { normaliseString } = require("../configs/type");

let findByUsername = (username) => {
    return db
      .query("SELECT * FROM account where username = $1", [username])
      .then(function({rows}) {
        rows = normaliseString(rows[0])
        delete rows.password
        return rows;
      })
      .catch(function(err) {
        if (err.hint) {
          throw { http: 400, code: "Username", message: "ID does not exsist"};
        }
        throw err;
    });
}

let findIDByUsername = (username) => {
  return db
    .query("SELECT user_id FROM account where username = $1", [username])
    .then(function({rows}) {
      rows = normaliseString(rows[0])
      return rows.user_id;
    })
    .catch(function(err) {
      if (err.hint) {
        throw { http: 400, code: "Username", message: "ID does not exsist"};
      }
      throw err;
  });
}

let createAccount = (username, password, type) => {
    username = username.trim()
    password = bcrypt.hashSync(password, 10);
    return db
      .query("SELECT * FROM create_account($1, $2, $3)", [username, password, type])
      .then(function({ rows }) {
        rows = normaliseString(rows[0])
        delete rows.password
        return rows;
      })
      .catch(function(err) {
        if (err.hint) {
          throw { http: 400, code: "INVALID_INFO", message: err.hint };
        }
        throw err;
      });
}

let login = (username, password) => {
  return db.query("SELECT * FROM account WHERE username=$1", [username])
  .then(function({ rows }) {
    if (rows.length !== 1) {
      throw { http: 404, code: "NO_USER", message: "User does not exist" };
    }
    let user = normaliseString(rows[0]);
    if (bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    } else {
      throw { http: 400, code: "WRONG_PASSWORD", message: "Wrong password" };
    }
  });
}

let updateAccount = (username, password, type) => {
  if (password == null || type == null){
    throw { http: 404, code: "INVALID_INFO", message: "Dont have enough parameter" };
  }
  console.log(username, password, type)
  password = bcrypt.hashSync(password, 10);
  return db
    .query("UPDATE account SET username = $1, password = $2, type = $3 where username = $1", [username, password, type])
    .then(function({ rows }) {
      return {status : "Success"};
    })
    .catch(function(err) {
      if (err.hint) {
        throw { http: 400, code: "INVALID_INFO", message: err.hint };
      }
      throw err;
    });
}
module.exports = {
    findByUsername,
    createAccount, 
    login,
    updateAccount,
    findIDByUsername
};