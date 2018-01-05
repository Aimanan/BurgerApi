const BurgerData = require('./burger.data');

const init = async (db) => {
    return {
        burgers: new BurgerData(db)
    };
};

module.exports = { init };