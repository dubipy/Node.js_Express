//웹서버를 띄워보자

const express = require("express");
const admin = require("./routes/admin");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

nunjucks.configure("template", {
  autoescape: true,
  express: app,
});

// 미들웨어 셋팅
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("uploads"));

app.use((req, res, next) => {
  app.locals.isLogin = false;
  app.locals.req_path = req.path;
  next();
});

// 내가 띄워주는 reponse만 사용자가 볼 수 있다
app.get("/", (req, res) => {
  res.send("hello, 안녕, 안녕하세요");
});

app.get("/test-site", (req, res) => {
  res.send("hello test-site, get 요청했어!");
});

app.use("/admin", admin);

app.listen(port, () => {
  console.log("Express listening on port", port);
});
