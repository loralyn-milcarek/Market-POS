const db = require('./model.js');

const controller = {};

controller.getInventory = (req, res, next) => {
  const invQuery = 
  `SELECT *
  FROM inventory`;

  db.query(invQuery)
    .then(data => {
      res.locals.inventory = data.rows;
    //   console.log(res.locals.inventory);
      next();
    })
    .catch(err => {
      const errObj = {
        log: 'error in getInventory',
        message: `Server error ${err}`
      };
    })

};

module.exports = controller;