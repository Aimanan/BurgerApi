//const UserData = require('./users.data');
//const PostData = require('./posts.data');

const init = (db) => {
    return Promise.resolve({
        //users: new UserData(db),
        //posts: new PostData(db)
    });
};

module.exports = { init };