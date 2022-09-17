const errorType = require("../constants/erorrType");
const userServer = require("../server/users.server");
const authServer = require("../server/auth.server");
const md5Password = require("../utilts/password-hanld");
const { per } = require("../app/permission/permission");
const { PUBLICKEY } = require("../app/config");
const jwt = require("jsonwebtoken");
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  //验证有没有输入
  if (!username || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  console.log(md5Password(password));

  //验证是否存在用户
  const data = await userServer.getUserByName(username);
  const user = data[0];
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  //用md5验证密码
  //验证密码是否正确
  if (md5Password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx._user = user;

  //进入下一个中间件
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 验证得中间件
  const authorization = ctx.headers.authorization;

  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }

  //   验证正确性能
  try {
    const result = jwt.verify(authorization, PUBLICKEY, {
      algorithms: ["RS256"],
    });
    ctx._user = result;

    await next();
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

//权限验证
const verifyPermission = async (ctx, next) => {
  const user = ctx._user;

  //当前接口的权限
  const urlPer = per[ctx.request.url];

  // 获取请求路径
  try {
    const result = await authServer.getPermission(user.id);

    const flag = result.some((item) => {
      return item.id === urlPer || item.id === 1;
    });

    if (flag) {
      await next();
    } else {
      const error = new Error(errorType.UNNEWPERMISSION);
      ctx.app.emit("error", error, ctx);
    }
  } catch (error) {
    //如果没获取到权限会报错，但是这样是bug
    console.log(error);
  }
};

module.exports = { verifyLogin, verifyAuth, verifyPermission };
