const express = require("express");
const router = express.Router();
const User = require("../core/userController");
const Auth = require('../core/authContoller');
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.get(
  "/:userId",
  new Auth().isAuthorized,
  async function (req, res) {
    let result = await new User().getUserInfo(req);
    return new APIResponseHandler().handle(res, result);
  }
);

router.post("/signup", async function (req, res) {
  let result = await new User().createUser(req);
  return new APIResponseHandler().handle(res, result);
});

router.post("/login", async function (req, res) {
  let result = await new User().checkIfUserExists(req);
  new Auth().login(req, result);
  return new APIResponseHandler().handleAuthentication(res, result);
});

router.post("/logout", async function (req, res) {
  return new Auth().logout(req, res);
});

module.exports = router;
