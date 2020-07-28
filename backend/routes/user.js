const express = require("express");
const router = express.Router();
const User = require("../core/userController");
const Teacher = require("../core/teacherController");
const Auth = require("../core/authContoller");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

//Common for both student and teacher

//get public profile info of user with userId
router.get("/:userId", async function (req, res) {
  let result = await new User().getUserInfo(req);
  return new APIResponseHandler().handle(res, result);
});

//get all classrooms of a particular user with userId
router.get("/:userId/classrooms", new Auth().isAuthorized, async function (
  req,
  res
) {
  let result = await new User().getAllClassrooms(req);
  return new APIResponseHandler().handle(res, result);
});

//All routes related to login signup and logout

//create new user
router.post("/signup", async function (req, res) {
  let result = await new User().createUser(req);
  return new APIResponseHandler().handle(res, result);
});
//login
router.post("/login", async function (req, res) {
  let result = await new User().checkIfUserExists(req);
  new Auth().login(result);
  return new APIResponseHandler().handleAuthentication(res, result);
});

//Routes for teacher

//create a new classroom for teacher with userId
router.post("/:userId/classrooms", new Auth().isTeacher, async function (
  req,
  res
) {
  let result = await new Teacher().createClassroom(req);
  return new APIResponseHandler().handle(res, result);
});

//add new student to the classroom with classroomId
router.post(
  "/:userId/classrooms/:classroomId/students",
  new Auth().isTeacher,
  async function (req, res) {
    let result = await new Teacher().addStudentToClass(req);
    return new APIResponseHandler().handle(res, result);
  }
);

//get all students of a particular classroom with classroomId
router.get(
  "/:userId/classrooms/:classroomId/students",
  new Auth().isTeacher,
  async function (req, res) {
    let result = await new Teacher().getListOfStudentsInClassroom(req);
    return new APIResponseHandler().handle(res, result);
  }
);

//update classroom information
router.put(
  "/:userId/classrooms/:classroomId",
  new Auth().isTeacher,
  async function (req, res) {
    let result = await new Teacher().updateClassroom(req);
    return new APIResponseHandler().handle(res, result);
  }
);

module.exports = router;
