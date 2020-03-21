const express = require('express')
const router = express.Router();
const controller = require('./controller');

router.get('/:th', controller.GET);

module.exports = router;