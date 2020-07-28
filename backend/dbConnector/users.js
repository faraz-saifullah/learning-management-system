"use strict";
let DataService = require("../utils/datasource/DataService");

class ProductsDbConnector {
  constructor() {
    this.dataService = new DataService();
  }

  async createUser(reqBody, password) {
    const sqlQuery = {
      text: `INSERT INTO users (name, email, phone, type, password, date_of_birth, city, state) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING user_id`,
      values: [
        reqBody.name,
        reqBody.email || "",
        reqBody.phone,
        reqBody.type,
        password,
        reqBody.dateOfBirth || "",
        reqBody.city || "",
        reqBody.state || "",
      ],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }

  async getUserInfoById(userId) {
    const sqlQuery = {
      text:
        "SELECT name, email, phone, date_of_birth, city, state FROM users where user_id = ($1)",
      values: [userId],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }

  async getUserInfo(phone) {
    const sqlQuery = {
      text: "SELECT * FROM users where phone = ($1)",
      values: [phone],
    };
    try {
      return await this.dataService.executeQueryAsPromise(sqlQuery);
    } catch (err) {
      return err;
    }
  }
}

module.exports = ProductsDbConnector;
