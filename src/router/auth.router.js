const router = require("koa-router");

const { login, suss } = require("../controller/auth.controller");
const {
  verifyLogin,
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");

const useRouter = new router();

// useRouter.get("/add", (ctx, next) => {
//   const authorization = ctx.headers.authorization;
// });

useRouter.post("/login", verifyLogin, login);
useRouter.post("/test", verifyAuth, verifyPermission, suss);

module.exports = useRouter;
