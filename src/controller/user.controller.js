const { getUserList } = require("../server/users.server");

class user {
  async getUserListSuss(ctx) {
    try {
      const result = await getUserList();
      ctx.body = {
        code: "200",
        msg: "获取成功",
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async createUserSuss(ctx) {
    ctx.body = {
      code: "200",
      msg: "创建用户成功",
    };
  }

  async delUserSuss(ctx) {
    ctx.body = {
      code: "200",
      msg: "删除成功",
    };
  }

  async upDataUserSuss(ctx) {
    ctx.body = {
      code: "200",
      msg: "修改成功",
    };
  }
}

module.exports = new user();
