const express = require('express');
const router = express.Router();
const session = require('express-session');
const mysql = require('../database');

router.get('/' , (req,res)=>{
    req.session.user = null;
    res.render('register');
})



router.post('/' , (req,res)=>{
    
      
    const username  = req.body.username , email = req.body.email , pass = req.body.password ,name = req.body.name,number = req.body.number,age = req.body.age;
    var sql = `select * from users where username =  "${username}" or email="${email}`;
    
    mysql.query(sql , (err,result)=>{
       
        if (result && result.length !== undefined && result.length !== null && result.length !== 0) {
        return res.send('userExt');
    }
        
        
            sql = `insert into users (username , password ,name,email,phone,age) values("${username}" , "${pass}" ,"${name}" ,"${email}" , "${number}","${age}" )`;
            
            mysql.query(sql , (err,user)=>{
                req.session.user ={
                    
                    username:username,
                    email:email
                }
               
                return res.redirect('/userdashboard');
            })
        
            });
        })

module.exports = router;