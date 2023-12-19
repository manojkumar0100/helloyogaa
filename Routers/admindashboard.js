const express = require('express');
const session = require('express-session');
const router = express.Router();
const mysql = require('../database');
router.get('/' , (req,res)=>{
    
    sql = `select * from register where transaction_id is NOT NULL`;
    mysql.query(sql , (err,done)=>{
        sql = `select * from register where transaction_id is NULL`;
    mysql.query(sql , (err,notdone)=>{
        
        res.render('admindashboard' , {userdone:done,usernotdone:notdone});
    })
    })
    
})

module.exports = router;