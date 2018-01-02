const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const system = require('../system/');
const sentry = require('../lib/sentry');
const useCors = require('../lib/cors');
const rateLimit = require('../lib/rateLimit');
const { errorHandler, notFoundError } = require('../lib/errorHandler');
const favicon = require('serve-favicon');

const init = (data) => {
    const app = express();

    // Config application
    sentry.config(); 
    app.use(sentry.reqHandler());   
    app.use(require('helmet')());
    app.use(require('express-validator')());   
    app.use(sentry.errHandler());
    app.use(cors());
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/libs', express.static(path.join(__dirname, '../../node_modules')));

    // add routers
    app.use(favicon(path.join(__dirname,'../../client/images/favicon.png')));
    app.use('/', rateLimit);
    require('./routers/multirouter').attachTo(app, data);
    app.use('*', (req, res, next) => next(notFoundError(`No endpoint found that matches '${req.originalUrl}'`)));

    return Promise.resolve(app);
};

module.exports = { init };


