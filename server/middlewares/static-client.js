var express = require('express');
var router = express.Router();

//app.use(express.static('../client/build'));
router.get('/', function (req, res, ) {
    res.send('index');
});

module.exports = router;
