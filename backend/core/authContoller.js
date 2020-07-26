class Auth {
  isAuthorized(req, res, next) {
    // if (Number(req.params.userId) !== Number(req.session.userId)) {
    //   res.status(401).send("Unauthorizzed!");
    // } else {
    next();
    // }
  }

  login(req, result) {
    if (result.success) {
      req.session.name = result.data[0].name;
      req.session.userId = result.data[0].user_id;
      req.session.type = result.data[0].type;
    }
  }

  logout(req, res) {
    req.session.destroy();
    return res.send("Logout Successfull").status(200);
  }

  isTeacher(req, res, next) {
    // if (
    //   Number(req.params.userId) === Number(req.session.userId) &&
    //   req.session.type === "teacher"
    // ) {
    next();
    // } else {
    //   res.status(401).send("Unauthorizzed!");
    // }
  }
}

module.exports = Auth;
