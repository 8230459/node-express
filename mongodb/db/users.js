var User = require("../schema/users");
/*var CryptoJS = require("crypto-js");

function decrypt(val) {
  return CryptoJS.SHA256.decrypt(val.toString(), '123')
}*/

//操作用户表
module.exports = {
  //查找用户
  find(data, callback) {
    User.find(data, (err, cols) => {
      if (err) callback(err);
      else callback(cols);
    })
  },

  //查找单个用户
  findOne(query, callback) {
    User.findOne(query, (err, doc) => {
      if (err) callback(null);
      else callback(doc);
    })
  },

  //增加用户
  add(data, callback) {
    let _data = {_id: '3', username: '123333'}
    const user = new User(_data);
    //user.username = '123'//decrypt(data.name);
    //user.email = decrypt(data.email);
    //user.password = decrypt(data.password);


    user.save((err, doc) => {
      console.log(doc)
      if (err) callback(false, err);
      else callback(doc);
    })
  },

  //删除用户
  del(data, callback) {
    console.log(data)
    User.find(data).remove().exec((err, doc) => {
      if (err) callback(false, err);
      else callback(true, doc);
    })
  }
  ,

  //修改用户
  update(data, callback) {
    console.log(data)
    User.update(JSON.parse(data.condi), JSON.parse(data.modi), (err, doc) => {
      if (err) callback(false, err);
      else callback(true, doc);
    })
  }
}

