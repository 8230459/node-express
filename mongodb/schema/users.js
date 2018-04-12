//连接数据库
var mongoose = require("../db/");

//用户表结构
const userSchema = new mongoose.Schema({
  _id: Number,
  username: String,
  email: String,
  password: String,
  grade: String
});

module.exports = mongoose.model('users', userSchema);
