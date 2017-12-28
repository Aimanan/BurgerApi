const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const system = require('../system/');
const sentry = require('../lib/sentry');
const useCors = require('../lib/cors');
const rateLimit = require('../lib/rateLimit');
const { errorHandler, notFoundError } = require('../lib/errorHandler');

const init = (data) => {
    const app = express();

    // Config application
    sentry.config(); 
    app.use(sentry.reqHandler());   
    //app.use(require('helmet')());
    app.use(require('express-validator')());
    app.use('/', useCors(), rateLimit, require('./routers/test.rout'));
    app.use('*', (req, res, next) => next(notFoundError(`No endpoint found that matches '${req.originalUrl}'`)));
    
    //app.use(sentry.errHandler())
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    //require('../config/auth.config')(app, data);

    //app.use('/static', express.static(path.join(__dirname, '../../client')));
    app.use('/libs', express.static(path.join(__dirname, '../../node_modules')));

    // add routers
    require('./routers').attachTo(app, data);
    //app.use('/test', useCors(), rateLimit, require('./routers/index'))

    return Promise.resolve(app);
};

module.exports = { init };
