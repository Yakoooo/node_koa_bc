const connection = require("../app/database");

class userPermissions {
  // 角色关联表输入权限
  async setPermissions(uid, rid) {
    const sentence = `INSERT INTO user_roles ( uid , rid ) values ( ? , ? )`;
    const result = await connection.execute(sentence, [uid, rid]);
    return result[0];
  }

  //删除某个角色的权限
  async delUserRoles(uid) {
    const sentence = `delete from user_roles where uid = ?`;
    const result = await connection.execute(sentence, [uid]);
    return result[0];
  }
}

module.exports = new userPermissions();
