const filtersLib = require('../../filtersLib/');
const toInteger = require('lodash/toInteger');
const isEmpty = require('lodash/isEmpty');
const trackEvent = require('../../lib/trackEvent');
const { notFoundError, validationError } = require('../../lib/errorHandler');
const schema = require('../../models/burger');
const uniqueRandomArray = require('unique-random-array');
const sortBy = require('lodash/sortBy');
const paginate = require('../../lib/paginate');
const rateLimit = require('../../lib/rateLimit');

const { Router } = require('express');
const { ObjectID } = require('mongodb');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .post('/burger', (req, res) => {
            const burger = {
                name: req.body.name,
                tagline: req.body.tagline,
                description: req.body.description,
                first_brewed: req.body.first_brewed,
                image_url: req.body.image_url,
                abv: req.body.abv,
                ibu: req.body.ibu,
                target_fg: req.body.target_fg
                //aand so on
            };

            data.burgers.create(burger);      
            res.send('Burger created');
        })
        .get('/burger', (req, res, next) => {
            // const errors = req.validationErrors()
          
            // if (errors) {
            //   return next(validationError(errors));
            // }
            
            const burgerId = new ObjectID(req.query.burgerId);

            data.burgers.findById(burgerId)
                .then(burger => {
                    if (isEmpty(burger)) {
                        return next(notFoundError(`No burger found that matches the ID ${burgerId}`));
                    }
                
                    //trackEvent(`API - /burgers/id - ${req.originalUrl}`);
                    res.status(200);
                    res.json(burger);
                });
        })

        .get('/burgers', (req, res, next) => {

            // const errors = req.validationErrors();
          
            // if (errors) {
            //   return next(validationError(errors));
            // }
          
            data.burgers.getAll()
                .then(burgers => {
                    const paginatedBurgers = paginate(burgers, req);

                    trackEvent(`API - /burgers/ - ${req.originalUrl}`);
          
                    res.status(200);
                    res.json(paginatedBurgers);
                });
        })
        .get('/burgers/random/', (req, res) => {
            // data.burgers.getAll()
            //     .then((burgers) => {
            //         res.json(burgers);
            //     });
            // const randomBurger = filtersLib.random();
            // console.log('-----------------------------------------------------');
            // console.log(filtersLib);
            // console.log(filtersLib.random());
            // filtersLib.random()
            //     .then(burger => {
            //         res.status(200);
            //         res.json(burger);
            //     });
            data.burgers.getAll()
                .then(burger => {
                    const sortedDb = sortBy(burger, ['id']);
                
                    const randomBurger = uniqueRandomArray(sortedDb);
          
                    res.status(200);
                    res.json([randomBurger()]);
                  });
            //  trackEvent(`API - /burgers/random`);
            //  res.send('asd00');
        });

    app.use('', router);
    app.use(rateLimit);
};

module.exports = { attachTo };