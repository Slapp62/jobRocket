const { Router } = require('express');
const userRouter = require('./userRoutes.js');
const listingRouter = require('./listingRoutes.js');
const applicationRouter = require('./applicationRoutes.js');
const recommendationRouter = require('./recommendationRoutes.js');
const { handleError } = require('../utils/functionHandlers.js');
const router = Router();

// main api router
router.use('/api/users', userRouter);
router.use('/api/listings', listingRouter);
router.use('/api/recommendations', recommendationRouter);
router.use('/api/applications', applicationRouter);

module.exports = router;
