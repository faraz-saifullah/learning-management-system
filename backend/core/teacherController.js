const ClassroomsDbConnector = require("../dbConnector/classrooms");
const UserClassroomMapDbConnector = require("../dbConnector/userClassroomMap");
const UsersDbConnector = require("../dbConnector/users");
const User = require("./userController");

class Teacher extends User {
  constructor() {
    super();
    this.classroomsDbConnector = new ClassroomsDbConnector();
    this.userClassroomMapDbConnector = new UserClassroomMapDbConnector();
    this.usersDbConnector = new UsersDbConnector();
  }

  async createClassroom(req) {
    try {
      const result = await this.classroomsDbConnector.createClassroom(
        req.body,
        req.session
      );
      if (result.data && result.data[0]) {
        this.userClassroomMapDbConnector.createNewPair({
          ...req.body,
          ...req.session,
          classroomId: result.data[0].classroom_id,
          dateCreated: new Date().toISOString().split("T")[0],
        });
      }
      return result;
    } catch (err) {
      return err;
    }
  }

  async updateClassroom(req) {
    try {
      return this.classroomsDbConnector.updateClassroom(
        req.params.classroomId,
        req.body
      );
    } catch (err) {
      return err;
    }
  }

  async addStudentToClass(req) {
    try {
      const user = await this.usersDbConnector.getUserInfo(req.body.phone);
      if (user.data && user.data[0]) {
        const studentId = user.data[0].user_id;
        const result = await this.userClassroomMapDbConnector.createNewPair({
          userId: studentId,
          classroomId: req.params.classroomId,
          dateEnrolled: new Date().toISOString().split("T")[0],
        });
        return result;
      } else {
        return user;
      }
    } catch (err) {
      return err;
    }
  }

  async getListOfStudentsInClassroom(req) {
    try {
      return this.userClassroomMapDbConnector.getAllStudentsOfClassroom(
        req.params.classroomId
      );
    } catch (err) {
      return err;
    }
  }
}

module.exports = Teacher;
