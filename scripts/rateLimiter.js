const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP to 150 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
