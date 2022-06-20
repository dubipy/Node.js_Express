const express = require("express");
const router = express.Router();

function testMiddleware(req, res, next) {
  console.log("첫번째 미들웨어");
  next();
}

function testMiddleware2(req, res, next) {
  console.log("두번째 미들웨어");
  next();
}

router.get("/", testMiddleware, testMiddleware2, (req, res) => {
  res.send("admin 이후 url");
});

// router.get('/products' , (req, res) => {
//     if(로그인이 안되어있으면 이동) res.redirect('/accounts/login');
//     res.send('admin 이후 url')
// });

router.get("/products", (req, res) => {
  // res.send('admin 이후 url/products')
  res.render("admin/products.html", {
    message: "<h1>태그 출력</h1>!",
    online: "express!",
  });
});

router.get("/products/write", (req, res) => {
  res.render("admin/write.html");
});

router.post("/products/write", (req, res) => {
  res.send(req.body);
});

module.exports = router;
