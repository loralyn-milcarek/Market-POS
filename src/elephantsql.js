const pg = require('pg');

const conString = "postgres://vkmdabnu:MzTxu8fE2xTNBdGCO20R7WmQ9QIfUrca@chunee.db.elephantsql.com/vkmdabnu";
const client = new pg.Client(conString);

client.connect(function(err) {

  if(err) {
    return console.log('error running query', err);
  }
  
//   client.query(`INSERT INTO inventory(id, product, quantity, price) 
//     VALUES ('2', 'squash', '20', '.50')
//     RETURNING *`, 
//     function(err, result) {
//       if(err) {
//         return console.log('error running query', err);
//     };

  client.query('SELECT * FROM inventory', function(err, result) {
    if(err) {
      return console.log('error running query', err);
    }

    console.log('result ', result.rows);

    client.end();
  
  });
});

module.exports = client;

// client
//   .connect()
//   .then(() => console.log('connected'))
//   .catch(err => console.log('connection error', err.stack));
