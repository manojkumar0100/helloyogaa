const express = require('express');
const mysql = require('../database');
const session = require('express-session');
const router = express.Router();

router.get("/" , (req,res)=>{
    if(!req.session.user) {
        req.session.user = {
            username:"",
            userid:""
        }
    }
    const payload = {};
    payload.username = "";
    if(req.session.user ){
        payload.username = req.session.user.username;
    }
    var sql = `select * from register where username="${payload.username}" and transaction_id is NOT NULL`;
    var paydone;
    var paynotdone;
    
    mysql.query(sql , (err,register)=>{

        sql = `select * from register where username="${payload.username}" and transaction_id is NULL`;
        mysql.query(sql , (err,registernot)=>{
            res.render('userdashboard' , {username:payload.username,userdone:register,usernotdone:registernot});
        })
        
    })

})
module.exports = router;