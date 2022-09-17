//开始创建路由 ，登录也归类在用户路由里面
// 赋值给app，调用函数进行隐形绑定
const fs = require("fs");
const useRouter = function () {
  //现从目录读取本地文件夹
  fs.readdirSync(__dirname).forEach((item) => {
    if (item === "index.js") return;
    const router = require(`./${item}`);
    this.use(router.routes());
    this.use(router.allowedMethods());
  });
};

module.exports = { useRouter };
