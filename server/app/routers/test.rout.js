const express = require('express');
const router = express.Router();

router.get('/burgers/random', require('../api/random'));
router.get('/burgers/:burgerId', require('../api/burger'));
router.get('/burgers', require('../api/burgers'));

module.exports = router;
