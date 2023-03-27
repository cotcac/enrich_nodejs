const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const check_title = require('../varilations/blog_validation');
const blogsx = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  const blogs = blogsx;
  res.json(blogs);
});

// requirement title at least 3 letters.
router.post(
  '/',
  body('title')
    .isLength({min: 5, max: 50})
    .withMessage('must be from 5 - 50 chars long')
    .trim()
    .escape(),
  body('content')
    .isLength({min: 5})
    .withMessage('must be from 5 - 50 chars long')
    .trim()
    .escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const body = req.body;
    const data = {
      title: body.title,
      content: body.content,
    };
    blogsx.push(data);
    res.status(200).json(data);
  },
);

router.put('/:id', function(req, res, next) {
  const id = req.params.id;
  const data = {
    name: 'Nodejs',
  };
  // work with db to update blog
  res.status(200).json(data);
});

router.delete('/id', function(req, res, next) {
  const id = req.params.id;
  // work with db to delete blog
  res.status(204).json(data);
});

module.exports = router;
