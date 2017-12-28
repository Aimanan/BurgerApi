const { Router } = require('express');
var path = require('path');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('', (req, res) => {
            res.sendFile(path.join(__dirname + '/../../../client/index.html'));
        })
        .get('/jquery', (req, res) => {
            res.sendFile(path.join(__dirname + '/../../../node_modules/jquery/dist/jquery.min.js'));
        })
        .get('/navigo', (req, res) => {
            res.sendFile(path.join(__dirname + '/../../../node_modules/navigo/lib/navigo.min.js'));
        });

    app.use('/', router);
};

module.exports = { attachTo };