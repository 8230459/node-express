/**
 * Created by Andy Wang.
 * User: 8230459@qq.com
 * Date: 2018/4/26
 * Time: 16:31
 */

const express = require("express");
const {createToken, checkToken, checkCallback} = require("../token");

const {find, findOne, add, del, update} = require("../mongodb/db/users");
const app = express();

const captchapng = require('captchapng');

const router = express.Router();

//用户列表
router.get('/', function (req, res, next) {
  delete req.query.t
  checkCallback(req, res, () => {
    find(req.query, cols => {
      res.send(cols)
    })
  })
});

//用户登录
router.get('/signIn', function (req, res, next) {
  delete req.query.t
  findOne(req.query, doc => {
    if (doc) {
      const _user = {name: doc.name}
      const _token = createToken(_user)
      //res.cookie('Authorization', _token, {httpOnly: true})
      res.send({error: false, token: _token, auth: doc})
    } else {
      res.send({error: true, info: 'User Non-existent'})
    }
    res.end();
  })
});

//退出登录
router.get('/signOut', function (req, res, next) {
  const _token = req.cookies.Authorization
  if (_token) res.cookie('Authorization', 'null')
  res.send('Exit Success!')
});

//注册用户
router.get('/signUp', function (req, res, next) {
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
router.get('/checkColName', function (req, res) {
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

/*router.get('/verifiCodeA', function (req, res) {
  let _query = req.query;
  delete _query.t
  var codeConfig = {
    size: 5,// 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    height: 44
  }
  var captcha = svgCaptcha.create(codeConfig);
  //req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码

  //var img = captcha.data.getBase64();
  //var imgbase64 = new Buffer(captcha.data, 'base64');
  console.log('data:image/svg+xml;utf8,' + captcha.data)
  /!*res.writeHead(200, {
    'Content-Type': 'image/svg'
  });*!/
  res.end('data:image/svg+xml;utf8,' + captcha.data);
});*/

//验证码图片
router.get('/verifiCode', function (req, res) {
  let _query = req.query;
  delete _query.t
  global.verifiCode = parseInt(Math.random() * 9000 + 1000)
  console.log(global.verifiCode)
  var p = new captchapng(80, 30, global.verifiCode); // width,height,numeric captcha
  p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  //干扰线
  var lineIndex1 = p.index(5, 5)
  var lineIndex2 = p.index(20, 20)
  for (let i = 0; i < 70; i++) {
    p.buffer[lineIndex1 + 20 * i] = p.color('blue');
    p.buffer[lineIndex2 + 80 * i] = p.color('blue');
  }
  var img = p.getBase64();
  var imgbase64 = new Buffer(img, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  res.end(imgbase64);
});

//验证码图片
router.get('/checkVerifiCode', function (req, res) {
  const verifiCode = req.query.verifiCode;

  if (verifiCode * 1 === global.verifiCode * 1) res.send({error: false});
  else res.send({error: true});

  res.end();
});


module.exports = router;
