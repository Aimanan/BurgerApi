const BurgerData = require('./burger.data');
//const PostData = require('./posts.data');

const init = (db) => {
    return Promise.resolve({
        burgers: new BurgerData(db),
        //posts: new PostData(db)
    });
};

module.exports = { init };