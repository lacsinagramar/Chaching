var express = require('express');
var db = require('../../lib/database')();
var router = express.Router();
var magulangSession = {};
var anakSession = {};
//var authMiddleware = require('../auth/middlewares/auth');
// var indexController = require('./controllers/index');

router.get('/magulang', function(req, res){
    console.log(magulangSession)
    res.render('home/views/magulangIndex', {session: magulangSession})
})
router.get('/magulang/chat', function(req, res){
    res.render('home/views/magulangChat', {session: magulangSession});
})
router.get('/anakIndex', function(req, res){
    res.render('home/views/anakIndex')
})
router.get('/', function(req, res){
    res.render('home/views/index')
    magulangSession = "";
})
router.get('/anak', function(req, res){
    res.render('home/views/anak')
    magulangSession = "";
})
router.post('/login', function(req, res){
    var queryString = `SELECT * FROM tbl_magulang WHERE strUserName = ? AND strPassword =?`
    db.query(queryString,[req.body.username,req.body.userpassword],(err,results,fields)=>{
        if(err) throw err;
        if(results.length > 0){
            res.send({valid:true, results:results})
        }
        else{
            res.send({valid:false})
        }
        magulangSession.magulang = results[0];
        console.log(magulangSession.magulang)
        console.log(magulangSession)
    })
})
router.post('/login/anak', function(req, res){
    var queryString = `SELECT * FROM tbl_anak WHERE strUserName = ? AND strPassword =?`
    db.query(queryString,[req.body.username,req.body.userpassword],(err,results,fields)=>{
        if(err) throw err;
        if(results.length > 0){
            res.send({valid:true, results:results})
            console.log(results)
        }
        else{
            res.send({valid:false})
        }
        
    })
})
router.post('/addChild', function(req, res){
    var queryString = `INSERT INTO tbl_anak(strUserName,intMagulangId,strPassword,strFirstName,strMiddleName,strLastName)
    VALUES(?,?,?,?,?,?)`
    console.log(magulangSession.magulang)
    db.query(queryString,[req.body.userName,magulangSession.magulang.intUserId,req.body.passWord,req.body.firstName,req.body.middleName,req.body.lastName],(err,results,fields)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
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