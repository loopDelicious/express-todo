var express = require('express');
var router = express.Router();

var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = "postgres://localhost:5432/todo";
var db = pgp(connectionString);


// create postgres table if not exists
db.none("CREATE TABLE IF NOT EXISTS items (id SERIAL, text TEXT, complete BOOLEAN)").then(function() {
    console.log ('created table');
});


// GET items from database
router.get('/', function(req, res, next) {

  // use postgres to get all todos in the database
  db.any('SELECT * FROM items')
    .then(function(data) {
      res.render('../views/index.jade', {todoItems: data});
    })
    .catch(function(err) {
      return next(err);
    });
});


// POST to ADD new item to todos list
router.post('/todo', function(req, res, next) {

  var insertion = 'INSERT INTO items (text, complete) VALUES ($1, $2)';

  db.none(insertion, [req.body.text, false])
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      return next(err);
    });
});


// POST to UPDATE existing item in todos list
router.post('/todo/:id', function(req, res, next) {

  var itemID = parseInt(req.params.id);
  var update = 'UPDATE items SET complete=true WHERE id=$1';

  db.none(update, [itemID])
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      return next(err);
    });
});


module.exports = router;
