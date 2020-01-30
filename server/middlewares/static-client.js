var express = require('express');
var router = express.Router();

router.use('/', express.static('../client/build'));

module.exports = router;
