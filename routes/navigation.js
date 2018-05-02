/**
 * Created by Andy Wang.
 * User: 8230459@qq.com
 * Date: 2018/4/26
 * Time: 16:31
 */

var express = require("express");
var {createToken, checkToken, checkCallback} = require("../token");

var {find, findOne, add, del, update} = require("../mongodb/db/navigation");
var app = express();
const router = express.Router();


//导航列表
router.get('/', function (req, res, next) {
  delete req.query.t
  checkCallback(req, res, () => {
    find(req.query, cols => {
      res.send(cols)
    })
  })
});

/*
//增加条目
router.get('/add', function (req, res, next) {
  add(req.query, (success, doc) => {
    if (success) res.send(doc);
    else console.log(doc);
  })
});

//删除条目
router.get('/del', function (req, res, next) {
  del(req.query, (success, doc) => {
    if (success) res.send(doc);
    else console.log(doc);
  })
});

//修改条目
router.get('/update', function (req, res, next) {
  update(req.query, (success, doc) => {
    if (success) res.send(doc);
    else console.log(doc);
  })
});*/

module.exports = router;
