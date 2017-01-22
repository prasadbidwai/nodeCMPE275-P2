var orm = require('orm');

var db = orm.connect('mysql://root:password123@localhost/project2');

db.on('connect', function (err, db) {
  if (err) 
  	throw err;
  else
  	console.log('connected to db');
});

module.exports = db;
