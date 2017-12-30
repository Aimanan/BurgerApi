const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/form', (req, res) => {

            return controller.getForm(req, res);
        })

        .post('/form', (req, res) => {
            return controller.create(req, res);
        });

    app.use('/meals', router);
};

module.exports = { attachTo };