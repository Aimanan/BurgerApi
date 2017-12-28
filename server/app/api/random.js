const filtersLib = require('../../filtersLib/');
const trackEvent = require('../../lib/trackEvent');
;
function random (req, res) {
 const randomBurger = filtersLib.random();

  trackEvent(`API - /burgers/random`);
  res.status(200);
  res.json(randomBurger);
};

module.exports = random;
