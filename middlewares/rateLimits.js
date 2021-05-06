const rateLimit = require('express-rate-limit');

const rateLimits = rateLimit({
  windowMs: 20 * 1000,
  max: 10,
});

module.exports = { rateLimits };
