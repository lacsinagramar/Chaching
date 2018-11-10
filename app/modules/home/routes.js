var express = require('express');
var db = require('../../lib/database')();
var router = express.Router();
//var authMiddleware = require('../auth/middlewares/auth');
// var indexController = require('./controllers/index');

router.get('/magulang', function(req, res){
    res.render('home/views/magulangIndex')
})
router.get('/anakIndex', function(req, res){
    res.render('home/views/anakIndex')
})
router.get('/', function(req, res){
    res.render('home/views/index')
})
router.post('/login', function(req, res){
    var queryString = `SELECT * FROM tbl_magulang WHERE strUserName = ? AND strPassword =?`
    db.query(queryString,[req.body.username,req.body.userpassword],(err,results,fields)=>{
        if(err) throw err;
        console.log(results)
        if(results.length > 0){
            res.send({valid:true, results:results})
        }
        else{
            res.send({valid:false})
        }
    })
})
router.post('/signup', function(req, res){
    var queryString = `INSERT INTO tbl_magulang(strUserName,strBankAccount,strPassword,strFirstName,strMiddleName,strLastName)
    VALUES(?,?,?,?,?,?)`
    db.query(queryString,[req.body.userName,req.body.bankAccount,req.body.passWord,req.body.firstName,req.body.middleName,req.body.lastName],(err,results,fields)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})

exports.index = router;