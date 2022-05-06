const express = require('express');
const app = express();
const path = require('path');
const controller = require('./controller.js');
const router = express.Router();

// const pg = require('pg');
// const conString = "postgres://vkmdabnu:MzTxu8fE2xTNBdGCO20R7WmQ9QIfUrca@chunee.db.elephantsql.com/vkmdabnu";
// const client = new pg.Client(conString);

const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.get('/js', (req, res) => {
    res.sendFile('src/index.js', { root: __dirname });
    console.log('js');
});


app.get('/inv', controller.getInventory, (req, res) => {
    // res.sendFile('build/index.html', { root: __dirname });
    // console.log(res.locals.inventory);
    res.send(res.locals.inventory);
});

// router.get('/inv',
//   controller.getInventory,
//   (req, res) => {
//     console.log(req.query);
//   }
// );


// app.get('/kale', (req, res) => {
//     console.log('kale');
//     client.connect(function(err) {
//         console.log('connected');
//         client.query('SELECT * FROM inventory', function(err, result) {
//             if(err) {
//                 return console.log('error running query ', err);
//             }
//             console.log('result ', result.rows);
//             client.end();
//         });
//     });
// });

app.get('/h', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname });
    console.log('html');
});

app.listen(3000);



// app.use('/build', express.static(path.join(__dirname, '../build')));

// app.get('/', (req, res) => {
//     return res.status(200).sendFile(path.join(__dirname, '../index.html'));
//   });

// app.listen(8080);