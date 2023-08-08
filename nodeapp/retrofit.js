var express = require('express');
var router = express.Router();

router.get('/get', function (req, res, next) {
    console.log('GET 호출 / data : ' + req.query.data);
    console.log('path : ' + req.path);
    res.send('습도 : 20, 온도 : 40, 수온 : 23');
});



module.exports = router;
