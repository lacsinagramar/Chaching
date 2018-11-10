
var express = require('express');

var router = express.Router();
//var authMiddleware = require('../auth/middlewares/auth');
// var indexController = require('./controllers/index');

router.get('/', function(req, res){
    res.render('home/views/index')
})
router.get('/magulang', (req, res) => {
    res.render('home/views/magulangIndex')
})
exports.index = router;