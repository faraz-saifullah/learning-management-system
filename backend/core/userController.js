const UsersDbConnector = require("../dbConnector/users");
const UserClassroomMapDbConnector = require("../dbConnector/userClassroomMap");
const bcrypt = require("bcrypt");

class User {
  //creating new paysafe user
  constructor() {
    this.usersDbConnector = new UsersDbConnector();
    this.userClassroomMapDbConnector = new UserClassroomMapDbConnector();
  }

  async createUser(req) {
    try {
      let password = await bcrypt.hash(req.body.password, 5);
      return await this.usersDbConnector.createUser(req.body, password);
    } catch (err) {
      return err;
    }
  }

  async getUserInfo(req) {
    try {
      return await this.usersDbConnector.getUserInfoById(req.params.userId);
    } catch (err) {
      return err;
    }
  }

  async checkIfUserExists(req) {
    try {
      let userInfo = await this.usersDbConnector.getUserInfo(req.body.phone);
      if (userInfo.success) {
        const isPasswordCorrect = await bcrypt.compare(
          req.body.password,
          userInfo.data[0].password
        );
        if (isPasswordCorrect) {
          return userInfo;
        } else {
          return {
            success: false,
            status: 400,
            message: "Incorrect phone number or password",
          };
        }
      } else {
        return {
          success: false,
          status: 400,
          message: "User does not exist",
        };
      }
    } catch (err) {
      return err;
    }
  }

  async getAllClassrooms(req) {
    try {
      return await this.userClassroomMapDbConnector.getAllClassroomsOfUser(
        req.params.userId
      );
    } catch (err) {
      return err;
    }
  }
}

module.exports = User;
