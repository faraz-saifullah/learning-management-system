"use strict";
let DataService = require("../utils/datasource/DataService");

class ProductsDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async createNewPair(classDetails) {
    const sqlQuery = {
      text: `INSERT INTO user_classroom_map 
        (user_id, classroom_id, date_enrolled, date_created) 
        VALUES($1, $2, $3, $4) RETURNING user_id, classroom_id`,
      values: [
        classDetails.userId,
        classDetails.classroomId,
        classDetails.dateEnrolled || "",
        classDetails.dateCreated || "",
      ],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }

  async getAllClassroomsOfUser(userId) {
    const sqlQuery = {
      text: `SELECT * FROM user_classroom_map JOIN classrooms USING (classroom_id) where user_id = ($1);`,
      values: [userId],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }
}

module.exports = ProductsDbConnector;
