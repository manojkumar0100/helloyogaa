const express = require('express');
const router = express.Router();
const session = require('express-session');
const mysql = require('../database');
// const middleware = require('../middleware');

router.get('/' , (req,res)=>{
    const username =req.query.username;

    res.render('registermonth',{username:username});
})



router.post('/' , (req,res)=>{
    
      const username=req.body.username;
      const date_of_register=req.body.date_of_register;
      const batch=req.body.batch;
      const str=date_of_register.substr(0,7);
      const month = parseInt(str, 10);
      

    var sql = `select * from register where username =  "${username}" and date_of_register LIKE "${str}%"`;

    mysql.query(sql , (err,result)=>{
       if (result && result.length !== undefined && result.length !== null && result.length !== 0) {
            
        return res.send('already register');
    }
    else
    {
        sql = `select * from register where username =  "${username}" and transaction_id is NULL`;
        
    mysql.query(sql , (err,result)=>{
       
       if (result && result.length !== undefined && result.length !== null && result.length !== 0) {
            
        return res.send('due');
    }
    else
    {
        sql = `insert into register (username , month ,date_of_register,batch) values("${username}" , "${month}" ,"${date_of_register}" ,"${batch}"  )`;
            
            mysql.query(sql , (err,user)=>{
                req.session.user ={
                    
                    username:username,
                    
                }
                
                return res.send('sucess');
                
            })
            
    }
});
            
    }
        
            });
        })

module.exports = router;