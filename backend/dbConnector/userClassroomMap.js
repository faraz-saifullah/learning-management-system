"use strict";
let DataService = require("../utils/datasource/DataService");

class ProductsDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async createNewPair(classDetails) {
    const sqlQuery = {
      text: `INSERT INTO user_classroom_map 
        (user_id, user_name, type, classroom_id, classroom_name, date_enrolled, date_created) 
        VALUES($1, $2, $3, $4, $5, $6, $7)`,
      values: [
        classDetails.userId,
        classDetails.name,
        classDetails.type,
        classDetails.classroomId,
        classDetails.classroomName,
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
}

module.exports = ProductsDbConnector;
