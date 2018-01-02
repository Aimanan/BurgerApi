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
const idFilter = require('../../filtersLib/filters/id');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .post('/burger', (req, res) => {
            const burger = {
                name: req.body.name,
                tagline: req.body.tagline,
                description: req.body.description,
                first_made: req.body.first_made,
                image_url: req.body.image_url,
                abv: req.body.abv,
                ibu: req.body.ibu,
                target_fg: req.body.target_fg
                //and so on
            };

            data.burgers.create(burger);      
            res.send('Burger created');
        })

        .get('/burgers', (req, res, next) => {

            data.burgers.getAll()
                .then(burgers => {
                    let filtratedBurgers=[];

                    if(req.query.name) {
                        burgers.forEach(function(item) {
                            if(item.name==req.query.name) {
                                filtratedBurgers.push(item);
                            }
                        });
                    }
                    else filtratedBurgers=burgers;

                    let paginatedBurgers = paginate(filtratedBurgers, req);
                    trackEvent(`API - /burgers/ - ${req.originalUrl}`);
          
                    res.status(200);
                    res.json(paginatedBurgers);
                    
                // .then(burgers => {
                //     const paginatedBurgers = paginate(burgers, req);
    
                //     trackEvent(`API - /burgers/ - ${req.originalUrl}`);
              
                //     res.status(200);
                //     res.json(paginatedBurgers);
                });

        })
        .get('/burgers/random/', (req, res) => {
            data.burgers.getAll()
                .then(burger => {
                    const sortedDb = sortBy(burger, ['id']);

                    const randomBurger = uniqueRandomArray(sortedDb);
          
                    res.status(200);
                    res.json([randomBurger()]);
                  });
        });

    app.use(rateLimit);
    app.use('', router);
};

module.exports = { attachTo };