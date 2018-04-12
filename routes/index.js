var home = require('./home');
var users = require('./users');
module.exports = (app) => {
  app.use('/', home);
  app.use('/users', users);
}
