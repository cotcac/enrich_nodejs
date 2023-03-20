var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const arr = [1,2,3,4]
  res.render('index.hbs', { title: 'Express fdfdasfadsfds', arr: arr });
});

module.exports = router;
