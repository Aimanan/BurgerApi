const { Router } = require('express');
var path = require('path');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res.sendFile(path.join(__dirname + '../../../../client/index.html'));
        });

    app.use('', router);
};

module.exports = { attachTo };