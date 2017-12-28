// const express = require('express');
// const routes = express.Router();

const { Router } = require('express');
//var path = require('path');

const attachTo = (app, data) => {
    const router = new Router();

    // router.get('/burgers/random', require('../api/random'));
    // router.get('/burgers/:burgerId', require('../api/burger'));
    // router.get('/burgers', require('../api/burgers'));
    router
    .get('/burgers/random', (req, res) => {
        res.require('../api/random');
    })
    .get('/burgers/:burgerId', (req, res) => {
        res.require('../api/burger');
    })
    .get('/burgers', (req, res) => {
        res.require('../api/burgers');
    });

    app.use('/', router);
};

module.exports = { attachTo };