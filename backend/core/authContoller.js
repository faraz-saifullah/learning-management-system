const JWT = require("jsonwebtoken");
const Config = require("../Config.json")

class Auth {
  isAuthorized(req, res, next) {
    try {
      const token = req.headers["x-access-token"];
      if (!token) {
        res.status(401).send("Unauthorized!");
      }
      const decodedInfo = JWT.verify(token, Config.JWT.secret);
      if (Number(req.params.userId) !== decodedInfo.userId) {
        res.status(401).send("Unauthorized!");
      } else {
        req.body.auth = decodedInfo;
        next();
      }
    } catch (err) {
      return err
    }
  }

  login(result) {
    const token = JWT.sign(
      {
        userId: result.data[0].user_id,
        type: result.data[0].type,
        name: result.data[0].name,
      },
      Config.JWT.secret,
      {
        expiresIn: 86400,
      }
    );
    result.data[0].token = token;
  }

  isTeacher(req, res, next) {
    try {
      const token = req.headers["x-access-token"];
      if (!token) {
        res.status(401).send("Unauthorized!");
      }
      const decodedInfo = JWT.verify(token, Config.JWT.secret);
      if (Number(req.params.userId) !== decodedInfo.userId && decodedInfo.type === "teacher") {
        res.status(401).send("Unauthorized!");
      } else {
        req.body.auth = decodedInfo;
        next();
      }
    } catch (err) {
      return err
    }
  }
}

module.exports = Auth;
