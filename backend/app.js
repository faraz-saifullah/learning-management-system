"use strict";
const createError = require("http-errors");
const Pg = require("pg");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const logger = require("morgan");
const cors = require("cors");
const config = require("./Config.json");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express();

const pgPool = new Pg.Pool({
  user: config.PostgresDatabase.user,
  host: config.PostgresDatabase.host,
  database: config.PostgresDatabase.database,
  password: config.PostgresDatabase.password,
  port: config.PostgresDatabase.port,
});

app.use(
  session({
    name: config.Session.name,
    store: new pgSession({
      pool: pgPool,
    }),
    secret: config.Session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: true,
    }, // 15 days
    proxy: true,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
