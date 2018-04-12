/*import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './routes/index';
import errors from './errors';*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes/index');
var errors = require('./errors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser()); //解释请求的Cookie
app.use(logger('dev')); //在控制台显示简单的不同颜色的日志
app.use(bodyParser.json()); //解析请求的JSON
app.use(bodyParser.urlencoded({extended: false})); //解析请求的FORM
app.use(express.static(path.join(__dirname, 'public'))); //指定静态资源在public下

const ALLOW_ORIGIN = 'http://127.0.0.1:8000'

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN)
  res.header('Access-Control-Allow-Methods', "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Content-Type", "text/html;charset=utf-8")
  next()
});

//路由控制
router(app);

//错误页面
errors(app);

module.exports = app;

