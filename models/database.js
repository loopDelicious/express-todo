
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';


// create a new instance of Client to interact with the db
var client = new pg.Client(connectionString);
// establish connection with the db
client.connect();

// run a SQL query using query method
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() {
  client.end();
});