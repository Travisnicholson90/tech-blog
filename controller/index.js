const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api/index');
const homeRoutes = require('./homeRoutes');

//router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.get('*', (req, res) => {
    res.status(404).send('<h1>404 Page Not Found</h1>');
});

module.exports = router;