var express = require('express');
var router = express.Router();

var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = "postgres://localhost:5432/todo";
var db = pgp(connectionString);


// GET items from database
router.get('/todo', function(req, res, next) {

  // use postgres to get all todos in the database
  db.any('select * from items')
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL items'
        });
    })
    .catch(function(err) {
      return next(err);
    });
});


// POST new items to todos list
router.post('/todo', function(req, res, next) {

  // Grab data from http request
  var data = {
    text: req.body.text,
    complete: false
  };

  db.none('insert into items(text, complete)' +
    'values(${data.text}, ${data.complete}', req.body.text)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one item'
        });
    })
    .catch(function (err) {
      return next(err);
    });
});


// DELETE an item from the todos list
router.delete('/todo/:id', function(req, res,next) {
  var itemID = parseInt(req.params.id);
  db.result('delete from items where id = $1', itemID)
    .then(function(result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} item'
        });
    })
    .catch(function(err) {
      return next(err);
    });
});


router.use(express.static('public'));



// router.delete('api/todo/:todo_id', function(req, res) {
//   db.remove({
//     _id: req.params.todo_id
//   }, function(err, todo) {
//     if (err)
//       res.send(err);
//
//   //  get and reutrn all the todos after deleting one
//     db.find(function(err, todos) {
//       if (err)
//         res.send(err);
//       res.json(todos);
//     });
//   });
// });



  // Get a Postgres client from the connection pool
//   pg.connect(connectionString, function(err, client, done) {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         data: err
//       });
//     }
//
//     // SQL Query > Insert Data
//     client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);
//
//     // SQL Query > Select Data
//     var query = client.query("SELECT * FROM items ORDER BY id ASC");
//
//     // Stream results back one row at a time
//     query.on('row', function(row) {
//       results.push(row);
//     });
//
//     // After all data is returned, close connection and return results
//     query.on('end', function() {
//       done();
//       return res.json(results);
//     });
//   });
// });

module.exports = router;
