const connection = require("../app/database");

class userServer {
  //根据名字查询用户是否存在
  async getUserByName(name) {
    const sentence = `SELECT u.username username, u.password password, u.id id
      FROM users u WHERE username = ? `;
    const result = await connection.execute(sentence, [name]);
    return result[0];
  }

  //查询用户列表
  async getUserList() {
    const sentence = `SELECT u.id id, u.username username,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT( 'id', roles.id , 'type', roles.type )) 
    FROM user_roles,roles 
    where u.id = user_roles.uid and user_roles.rid = roles.id) roleList
    FROM users u`;
    const result = await connection.execute(sentence);
    return result[0];
  }

  // 创建用户
  async createUser(userInfo) {
    const sentence = `INSERT INTO users ( username , password ) values ( ? , ?)`;
    const result = await connection.execute(sentence, [
      userInfo.username,
      userInfo.password,
    ]);
    return result[0];
  }

  //删除用户
  async deleteUser(uid) {
    const sentence = `DELETE FROM users WHERE id = ?`;
    const result = await connection.execute(sentence, [uid]);
    return result[0];
  }

  //编辑用户信息
  // async upDataUser() {
  //   const sentence = `update users set  = ?`;
  //   const result = await connection.execute(sentence, [uid]);
  //   return result[0];
  // }
}

module.exports = new userServer();
