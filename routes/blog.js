var express = require("express");
var router = express.Router();
const check_title = require("../varilations/blog_validation")
const blogsx = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  const blogs = blogsx;
  res.json(blogs);
});

// requirement title at least 3 letters.
router.post("/", check_title, function (req, res, next) {
  const body = req.body;
  const data = {
    title: body.title,
  };
  blogsx.push(data);
  res.status(200).json(data);
});

router.put("/:id", function (req, res, next) {
  const id = req.params.id;
  const data = {
    name: "Nodejs",
  };
  // work with db to update blog
  res.status(200).json(data);
});

router.delete("/id", function (req, res, next) {
  const id = req.params.id;
  // work with db to delete blog
  res.status(204).json(data);
});

module.exports = router;
