const classroomsDbConnector = require("../dbConnector/classrooms");
const UserClassroomMapDbConnector = require("../dbConnector/userClassroomMap");
const User = require("./userController");

class Teacher extends User {
  constructor() {
    super();
    this.classroomsDbConnector = new classroomsDbConnector();
    this.userClassroomMapDbConnector = new UserClassroomMapDbConnector();
  }

  async createClassroom(req) {
    try {
      const result = await this.classroomsDbConnector.createClassroom(
        req.body,
        req.session
      );
      this.userClassroomMapDbConnector.createNewPair({
        ...req.body,
        ...req.session,
        classroomId: result.data[0].classroom_id,
        dateCreated: new Date().toISOString().split("T")[0],
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  async updateClassroom(req) {
    try {
      return this.classroomsDbConnector.updateClassroom(req.params.classroomId, req.body)
    } catch (err) {
      return err;
    }
  }
}

module.exports = Teacher;
