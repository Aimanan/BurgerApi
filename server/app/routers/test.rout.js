const express = require('express');
const router = express.Router();

const { Router } = require('express');
var path = require('path');

router.get('/burgers/random', require('../api/random'));
router.get('/burgers/:burgerId', require('../api/burger'));
router.get('/burgers', require('../api/burgers'));
//router1.get('/', require('../../../client/index.html'));
//router1.get('/', require('../../../client/index.html'));
// router1.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '../../../client/index.html'));
// });

//app.use('/', router1);

module.exports =router;

