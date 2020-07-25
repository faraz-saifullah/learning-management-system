const express = require("express");
const router = express.Router();
const User = require("../core/userController");
const Teacher = require("../core/teacherController");
const Auth = require("../core/authContoller");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

//Common for both student and teacher
router.get("/:userId", new Auth().isAuthorized, async function (req, res) {
  let result = await new User().getUserInfo(req);
  return new APIResponseHandler().handle(res, result);
});

router.get("/:userId/classrooms", new Auth().isAuthorized, async function (req, res) {
  let result = await new User().getAllClassrooms(req);
  return new APIResponseHandler().handle(res, result);
});

//All routes related to login signup and logout
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

//Routes for teacher
router.post("/:userId/classrooms", new Auth().isTeacher, async function (
  req,
  res
) {
  let result = await new Teacher().createClassroom(req);
  return new APIResponseHandler().handle(res, result);
});

module.exports = router;
