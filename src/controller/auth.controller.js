const jwt = require("jsonwebtoken");
const { PRIVATEKEY } = require("../app/config");

// console.log(PRIVATEKEY)

class authentication {
  login(ctx, next) {
    const { username, id } = ctx._user;
    const token = jwt.sign({ username, id }, PRIVATEKEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.body = {
      code: "200",
      data: {
        token,
      },
    };
  }

  suss(ctx, next) {
    console.log(ctx._user)
    ctx.body = {
      code: "200",
      msg: "验证成功",
    };
  }
}

module.exports = new authentication();
