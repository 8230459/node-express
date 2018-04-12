var express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express1', content: 'aaaaa'});
});

module.exports = router;
