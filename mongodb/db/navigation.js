/**
 * Created by Andy Wang.
 * User: 8230459@qq.com
 * Date: 2018/4/26
 * Time: 16:31
 */

//连接数据库
var mongoose = require("./conn");

//导航表结构
const schema = new mongoose.Schema(
  {
    title: String,
    index: String,
    path: String
  }, {
    versionKey: false
  }
);

//创建表模型
const Model = mongoose.model('navigations', schema);

//操作导航表
module.exports = {
  //查找导航列表
  find(data, callback) {
    Model.find(data, (err, cols) => {
      if (err) callback(err);
      else callback(cols);
    })
  },

  /*//增加条目
  add(data, callback) {
    let _data = {}
    _data.username = decrypt(data.username);
    _data.email = decrypt(data.email);
    _data.password = decrypt(data.password);
    const user = new model(_data);
    user.save((err, doc) => {
      if (err) callback(false, err);
      else callback(doc);
    })
  },

  //删除条目
  del(data, callback) {
    console.log(data)
    model.find(data).remove().exec((err, doc) => {
      if (err) callback(false, err);
      else callback(true, doc);
    })
  }
  ,

  //修改条目
  update(data, callback) {
    console.log(data)
    model.update(JSON.parse(data.condi), JSON.parse(data.modi), (err, doc) => {
      if (err) callback(false, err);
      else callback(true, doc);
    })
  }*/
}

