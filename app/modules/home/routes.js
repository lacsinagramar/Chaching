var express = require('express');
var db = require('../../lib/database')();
var router = express.Router();
var magulangSession = {};
var anakSession = {};
//var authMiddleware = require('../auth/middlewares/auth');
// var indexController = require('./controllers/index');

router.get('/magulang', function(req, res){
    console.log(magulangSession)
    queryString = `SELECT * from tbl_goal JOIN tbl_anak ON tbl_anak.intAnakId = tbl_goal.intAnakId
    WHERE tbl_goal.intMagulangId = ? AND tbl_goal.boolStatus = 0`
    db.query(queryString,[magulangSession.magulang.intUserId],(err,results1,fields)=>{
        if(err) throw err;
        console.log(magulangSession.magulang.intMagulangId)
        console.log(results1)
        res.render('home/views/magulangIndex',{goals:results1, session: magulangSession})
    })
})
router.get('/magulang/granted', function(req, res){
    var queryString = `SELECT * FROM tbl_goal WHERE intMagulangId = ?`
    db.query(queryString,[magulangSession.magulang.intUserId], (err, results, fields) => {
        if(err) console.log(err)

        res.render('home/views/magulangGranted', {session: magulangSession, goals: results})
    })
})
router.post('/query/goal', function(req, res){
    db.query('SELECT * FROM tbl_level WHERE intGoalId = ?',[req.body.id], (err, results, fields) => {
        if(err) console.log(err)
        res.send(results);
    })
})
router.post('/query/chores', function(req, res){
    db.query('SELECT * FROM tbl_chores WHERE intLevelId = ?',[req.body.levelId], (err, results, fields) => {
        if(err) console.log(err)
        res.send({levelId: req.body.levelId, data:results});
    })
})
router.get('/magulang/chat', function(req, res){
    res.render('home/views/magulangChat', {session: magulangSession});
})
router.get('/anakIndex', function(req, res){
    var queryString = `SELECT * FROM tbl_goal
    JOIN tbl_level ON tbl_goal.intGoalId = tbl_level.intGoalId
    JOIN tbl_chores ON tbl_level.intLevelId = tbl_chores.intLevelId
    JOIN tbl_anak ON tbl_goal.intAnakId = tbl_anak.intAnakId
    WHERE tbl_goal.intAnakId = ?`
    db.query(queryString, [anakSession.anak.intAnakId], (err, results, fields) => {
        if(err) console.log(err)
        res.render('home/views/anakIndex', {chores: results})
    })
})
router.get('/', function(req, res){
    res.render('home/views/index')
})
router.get('/login/anak', function(req, res){
    res.render('home/views/anak')
})
router.post('/login', function(req, res){
    magulangSession.magulang = {}
    var queryString = `SELECT * FROM tbl_magulang WHERE strUserName = ? AND strPassword =?`
    db.query(queryString,[req.body.username,req.body.userpassword],(err,results,fields)=>{
        if(err) throw err;
        console.log(results)
        if(results.length > 0){
            res.send({valid:true, results:results})
            magulangSession.magulang = results[0];
            console.log(magulangSession.magulang)
            console.log(magulangSession)
        }
        else{
            res.send({valid:false})
        }
        
    })
})
router.post('/updateGoal',function(req,res){
    var queryString = `UPDATE tbl_goal SET boolStatus = 1 WHERE intGoalId = ${req.body.id}`
    db.query(queryString,(err,results,fields)=>{
        if(err) throw err;
        var d = [5,10,20,50,100,200,500,1000]
        var queryString1 = `SELECT * FROM tbl_goal WHERE intGoalId = ${req.body.id}`
        db.query(queryString1,(err,results1,fields)=>{
            var goalPrice = results1[0].dblGoal
            var d1 = [];
            console.log("Goal "+goalPrice)
            for(i=0;i<d.length;i++){
                if(goalPrice <= d[i]){
                    d1.push(d[i-3])
                    d1.push(d[i-2])
                    d1.push(d[i-1])
                }
            }
            console.log("denominations: "+d1)
            var r1 = goalPrice/6
            var r2 = r1*2
            var r3 = r1*3
            var ctr = []
            ctr.push(Math.ceil(r1/d1[0]))
            ctr.push(Math.ceil(r2/d1[1]))
            ctr.push(Math.ceil(r3/d1[2]))
            for(var i = 0; i<ctr.length; i++){
                var iinsert = {denomination:d1[i],count:ctr[i]}
                var queryString1 = `INSERT INTO tbl_level(intLevel,jsonLevel,intGoalId)
                VALUES(${i+1},'${JSON.stringify(iinsert)}',${req.body.id})`
                db.query(queryString1,(err,results2,fields)=>{
                    if(err) throw err;
                    
                })
            }
            res.send(results)
        })
    })
})
router.post('/login/anak', function(req, res){
    var queryString = `SELECT * FROM tbl_anak WHERE strUserName = ? AND strPassword =?`
    db.query(queryString,[req.body.username,req.body.userpassword],(err,results,fields)=>{
        if(err) throw err;
        if(results.length > 0){
            res.send({valid:true, results:results})
            console.log(results)
            anakSession.anak = results[0];
            console.log(anakSession.anak)
            console.log(anakSession)
        }
        else{
            res.send({valid:false})
        }
        
    })
})
router.post('/addChild', function(req, res){
    var queryString = `INSERT INTO tbl_anak(strUserName,intMagulangId,strPassword,strFirstName,strMiddleName,strLastName,intBankAccount)
    VALUES(?,?,?,?,?,?,?)`
    console.log(magulangSession.magulang)
    db.query(queryString,[req.body.userName,magulangSession.magulang.intUserId,req.body.passWord,req.body.firstName,req.body.middleName,req.body.lastName,req.body.bankAccount],(err,results,fields)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})
router.post('/addGoal', function(req, res){
    var queryString = `INSERT INTO tbl_goal(intAnakId,intMagulangId,dblGoal)
    VALUES(?,?,?)`
    console.log(magulangSession.magulang)
    db.query(queryString,[anakSession.anak.intAnakId,anakSession.anak.intMagulangId,req.body.dblGoal],(err,results,fields)=>{
        if(err) throw err;
        console.log(results)
        res.send(results)
    })
})
router.post('/assignChore', function(req, res){
    var queryString = `INSERT INTO tbl_chores(intLevelId,strChoreName)
    VALUES(?,?)`
    console.log(req.body.choreName)
    db.query(queryString,[req.body.id,req.body.choreName],(err,results,fields)=>{
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
router.post('/done', function(req, res){
    db.query('UPDATE tbl_level SET booStatus = 1 WHERE intLevelId = ?', [req.body.id], (err, results, fields) =>{
        if(err) console.log(err)
        res.send().end()
    })
})
router.post('/addSavings', function(req, res){
    db.query('UPDATE tbl_anak SET intSavings = intSavings + ? where intAnakId = ?', [req.body.saving,1], (err, results, fields) =>{
            
        if(err) console.log(err)
        db.query('UPDATE tbl_level SET booStatus=2 WHERE intLevel=1',(err,results,fields)=>{
            res.send().end()
        })
        })     
    
    })
exports.index = router;