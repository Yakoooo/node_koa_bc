require("dotenv").config();
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
  path.resolve(__dirname, "./key/private.key")
);
const publicKey = fs.readFileSync(path.resolve(__dirname, "./key/public.key"));

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;
module.exports.PRIVATEKEY = privateKey;
module.exports.PUBLICKEY = publicKey;
