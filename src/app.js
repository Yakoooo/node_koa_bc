const serve = require("./app/index");
const { APP_HOST, APP_PORT } = require("./app/config");

serve.listen(APP_PORT, () => {
  console.log(`服务启动 ${APP_HOST}:${APP_PORT}`);
});
