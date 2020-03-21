const express = require('express')
const router = express.Router();
const controller = require('./controller');
const theme = require('/app/middlewares/theme');

router.get('/:t?', theme.resolve, controller.GET);

module.exports = router;