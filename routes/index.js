/**
 * Created by Andy Wang.
 * User: 8230459@qq.com
 * Date: 2018/4/26
 * Time: 16:31
 */

var home = require('./home');
var users = require('./users');
var navigation = require('./navigation');
module.exports = (app) => {
  app.use('/', home);
  app.use('/users', users);
  app.use('/navigation', navigation);
}
