const errorType = require("../constants/erorrType");
const {
  createUser,
  getUserByName,
  deleteUser,
} = require("../server/users.server");
const { setPermissions, delUserRoles } = require("../server/permission.server");
const md5Password = require("../utilts/password-hanld");
//报错列表

//验证创建用户的编辑信息
const verifyCreateUser = async (ctx, next) => {
  const { username, password: pwd, roleIds } = ctx.request.body;

  // if(typeof roleIds)
  if (!(roleIds instanceof Array)) {
    const error = new Error(errorType.NAME_OR_PASSWORD_AND_ROLES_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  //判断输入
  if (!username || !pwd || roleIds.length === 0) {
    const error = new Error(errorType.NAME_OR_PASSWORD_AND_ROLES_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  //验证是否存在用户
  const data = await getUserByName(username);
  const user = data[0];
  if (user) {
    const error = new Error(errorType.USERREPEAT);
    return ctx.app.emit("error", error, ctx);
  }

  //开始创建角色
  try {
    const password = md5Password(pwd);
    const result = await createUser({ username, password });
    //不管你的报错了创建的权限看你自己
    try {
      roleIds.forEach(async (item) => {
        try {
          const createResult = await setPermissions(result.insertId, item);
        } catch (error) {
          console.log("有权限没匹配上，或者类型错误，但是这里不管");
        }
      });
      await next();
    } catch (err) {}
  } catch (error) {
    //创建角色的错误捕捉
    console.log(error + "====" + "user_midd");
  }
};

const verifyDelUser = async (ctx, next) => {
  const { uid } = ctx.request.body;
  try {
    await deleteUser(uid);
    next();
  } catch (error) {
    console(error);
  }
};

const verifUpdataUser = async (ctx, next) => {
  const { uid, roles } = ctx.request.body;

  if (!uid || roles.length === 0) {
    const error = new Error(errorType.CheckParameters);
    return ctx.app.emit("error", error, ctx);
  }

  try {
    await delUserRoles(uid);

    roles.forEach(async (item) => {
      try {
        await setPermissions(uid, item);
      } catch (error) {
        console.log("有权限没匹配上，或者类型错误，但是这里不管");
      }
    });

    await next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyCreateUser, verifyDelUser, verifUpdataUser };
