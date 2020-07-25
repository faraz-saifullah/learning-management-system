"use strict";
let DataService = require("../utils/datasource/DataService");

class ProductsDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async createClassroom(reqBody, session) {
    const sqlQuery = {
      text: `INSERT INTO classrooms 
        (classroom_name, subject, teacher_name, teacher_id, number_of_students, timings, days, useful_resources) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING classroom_id`,
      values: [
        reqBody.classroomName,
        reqBody.subject || "",
        session.name,
        session.userId,
        reqBody.numberOfStudents || 0,
        reqBody.timings || "9am to 10am",
        reqBody.days || ["Monday"],
        reqBody.usefulResources.split(",") || [],
      ],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }
}

module.exports = ProductsDbConnector;
