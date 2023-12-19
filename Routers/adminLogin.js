const express = require('express');
const mysql = require('../database');
const session = require('express-session');
const router = express.Router();



router.get('/' , (req,res)=>{
    req.session.user = null;
    res.render('adminlogin');
})
router.post('/' , (req , res)=>{
    
    const username = req.body.username;
    const pass = req.body.password;
    var sql = `select * from admin where username = "${username}"`;
    mysql.query(sql , (err,results)=>{
        
        if(err) throw err;
        const user = results[0];
        const payload = {};
        payload.username = "";
        console.log(user.password);
        if(user.password == pass){
          
            
            
                
            
           req.session.user = user;
           payload.username = user.username;
       
           return  res.redirect('/admindashboard');
        }
        
        return res.redirect('/homeRouter');
    })
})
module.exports = router;