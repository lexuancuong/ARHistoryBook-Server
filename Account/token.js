let jwt = require("jsonwebtoken");
let { isString } = require("../configs/type");

function generateToken(username, user_id) {
    //generate a token by secret in .env file with expiration is 1 year
    let token = jwt.sign({ 'username': username , 'user_id': user_id}, process.env.SECRET, { expiresIn: "1y" });
    return token;
}
function extractInfo(req) {
    // Check if request contains token
    // Token may be contained in headers (for all users) or
    // in session cookie (for admins only)
    if (!req.headers.authorization) {
      throw { http: 401, code: "UNAUTHORISED", message: "Token required" };
    }
  
    // Check if req.headers.authorization is in the form "Bearer <jwt>"
    let authTokens = (req.headers.authorization).split(" ");
    if (authTokens.length !== 2 || authTokens[0] !== "Bearer") {
      throw { http: 401, code: "UNAUTHORISED", message: "Invalid token" };
    }
  
    let token = authTokens[1];
    try {
      let payload = jwt.verify(token, process.env.SECRET);
        
      //if true return payloading's information
      let a = payload.username
      let b = payload.user_id
      if (payload && isString(payload.username)) {
        return {'username': payload.username, 'user_id': payload.user_id};
      } else {
        throw null;
      }
    } catch (err) {
      throw { http: 401, code: "UNAUTHORISED", message: "Invalid token" };
    }
  }

function tokenValidator(req, res, next) {
    try {
      
      let { username , user_id } = extractInfo(req);
      req.body.username = username;
      req.body.user_id = user_id; 
      next();
    } catch (err) {
      next(err);
    }
  }
module.exports = {
    generateToken,
    tokenValidator,
  };