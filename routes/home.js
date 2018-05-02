/**
 * Created by Andy Wang.
 * User: 8230459@qq.com
 * Date: 2018/4/26
 * Time: 16:31
 */

var express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express1', content: 'aaaaa'});
});

module.exports = router;
