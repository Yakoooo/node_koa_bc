const router = require("koa-router");

const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/auth.middleware");
const {
  getUserListSuss,
  createUserSuss,
  delUserSuss,
  upDataUserSuss,
} = require("../controller/user.controller");
const {
  verifyCreateUser,
  verifyDelUser,
  verifUpdataUser,
} = require("../middleware/user.middleware");

const useRouter = new router({ prefix: "/user" });

//获取登录列表
useRouter.get("/getuserlist", verifyAuth, getUserListSuss);
useRouter.post(
  "/createuser",
  verifyAuth,
  verifyPermission,
  verifyCreateUser,
  createUserSuss
);
useRouter.post(
  "/deluser",
  verifyAuth,
  verifyPermission,
  verifyDelUser,
  delUserSuss
);
useRouter.post(
  "/updatauser",
  verifyAuth,
  verifyPermission,
  verifUpdataUser,
  upDataUserSuss
);

module.exports = useRouter;
