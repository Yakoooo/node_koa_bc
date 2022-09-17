const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { useRouter } = require("../router/index");
const errorHander = require("./errorHandle");
const app = new Koa();

app.use(bodyParser());
app.useRouter = useRouter;
app.useRouter();
app.on("error", errorHander);

//返回一个实例
module.exports = app;
