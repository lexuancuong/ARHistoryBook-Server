function isString(x) {
  return typeof x === "string" || x instanceof String;
}

function normaliseString(obj) {
  let ans = {};
  Object.keys(obj).forEach(function(key) {
    let value = obj[key];
    if (isString(value)) {
      value = value.trim();
    }
    ans[key] = value;
  });
  return ans;
}

module.exports = {
  isString,
  normaliseString
};
