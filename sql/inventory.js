import sql from '/Users/loralynmilcarek/Desktop/marketpos/src/db.js'

function getInventory() {
    const inventory = 
    SELECT *
    FROM inventory;
    
    return inventory;
}

console.log(getInventory());