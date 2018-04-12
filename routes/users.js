var express = require("express");
var {createToken, checkToken} = require("../token");

var {find, findOne, add, del, update} = require("../mongodb/db/users");
var app = express();
const router = express.Router();

//用户列表
router.get('/', function (req, res, next) {
  delete req.query.t
  const _token = req.cookies.Authorization
  if (_token && checkToken(_token)) {
    find(req.query, (cols) => {
      if (cols.length) res.send(cols)
      else console.log(cols)
    })
  } else {
    res.send('none')
  }
});

//用户登录
router.get('/login', function (req, res, next) {
  let _query = req.query;
  delete _query.t
  findOne(_query, doc => {
    if (doc) {
      let _user = {name: doc.name}
      res.cookie('Authorization', createToken(_user), {httpOnly: true})
      res.send(doc)
    } else {
      res.send('User Non-existent')
    }
    res.end();
  })
});

//退出登录
router.get('/exit', function (req, res, next) {
  const _token = req.cookies.Authorization
  if (_token) res.cookie('Authorization', 'null')
  res.send('Exit Success!')
});

//注册用户
router.get('/regist', function (req, res, next) {
  let _query = req.query;
  delete _query.t
  add(_query, (doc) => {
    if (doc) res.send('success');
    else res.send('faild');
  })
});


//删除用户
router.get('/del', function (req, res, next) {
  del(req.query, (success, doc) => {
    if (success) res.send(doc);
    else console.log(doc);
  })
});

//修改用户
router.get('/update', function (req, res, next) {
  update(req.query, (success, doc) => {
    if (success) res.send(doc);
    else console.log(doc);
  })
});

//检查用户名是否存在
router.get('/check_username', function (req, res) {
  let _query = req.query;
  delete _query.t
  console.log(_query)
  findOne(_query, doc => {
    if (doc) {
      res.send('1')
    } else {
      res.send('0')
    }
    res.end();
  })
});

//检查邮箱地址是否存在
router.get('/check_email', function (req, res) {
  let _query = req.query;
  delete _query.t
  findOne(_query, doc => {
    if (doc) {
      res.send('1')
    } else {
      res.send('0')
    }
    res.end();
  })
});

module.exports = router;
