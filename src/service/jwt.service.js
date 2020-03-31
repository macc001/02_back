const jwt = require("jwt-simple");
const dayjs = require("dayjs");

const secret = require("../config/global.config");

exports.createToken = function(user) {
  var payload = {
    id_user: user[0]["id_usuario"],
    iat: dayjs().unix(),
    exp: dayjs()
      .add(1, "days")
      .unix()
  };
  return jwt.encode(payload, secret.secret_token);
};
