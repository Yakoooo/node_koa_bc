const errorTypes = require("../constants/erorrType");

const errorHandleFunc = (err, ctx) => {
  let status, message;

  console.log(err.message);

  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case errorTypes.NAME_OR_PASSWORD_AND_ROLES_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码和角色不能为空~";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已经存在~";
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400; // 参数错误
      message = "用户名不存在~";
      break;
    case errorTypes.PASSWORD_IS_INCORRENT:
      status = 400; // 参数错误
      message = "密码是错误的~";
      break;
    case errorTypes.CREATEERR:
      status = 400; // 参数错误
      message = "创建失败,请检查传入的角色是否正确~";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401; // 参数错误
      message = "无效的token~";
      break;
    case errorTypes.UNPERMISSION:
      status = 401; // 参数错误
      message = "您不具备操作的权限~";
      break;
    case errorTypes.UNNEWPERMISSION:
      status = 401; // 参数错误
      message = "您不具备操作的权限~";
      break;
    case errorTypes.USERREPEAT:
      status = 401; // 参数错误
      message = "该用户名已经被创建~";
      break;
    case errorTypes.CheckParameters:
      status = 401; // 参数错误
      message = "请检查参数~";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandleFunc;
