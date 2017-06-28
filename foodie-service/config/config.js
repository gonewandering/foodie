var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'foodie'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root@localhost/foodie-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'foodie'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root@localhost/foodie-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'foodie'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://root@localhost/foodie-production'
  }
};

module.exports = config[env];
