const connection = require("../app/database");

class authServer {
  async getPermission(id) {
    const sentence = `SELECT r.id , r.type
      FROM users,user_roles,roles r 
      WHERE users.id = ? and user_roles.uid = users.id and user_roles.rid = r.id`;
    const result = await connection.execute(sentence, [id]);
    return result[0];
  }
}

module.exports = new authServer();
