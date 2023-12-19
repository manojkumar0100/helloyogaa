const express = require('express');
const router = express.Router();
const session = require('express-session');
const mysql = require('../database');
const { v4: uuidv4 } = require('uuid');


router.get('/' , (req,res)=>{
    
    const username =req.query.username;
    
    var sql = `select * from register where username =  "${username}" and transaction_id is NULL`;
    
    mysql.query(sql , (err,result)=>{
       if (result && result.length !== undefined && result.length !== null && result.length !== 0) {
        res.render('payment',{username:username,month:result[0].month});
    }
    else
    {
        
        res.render('userdashboard',{username:username});
    }
});
    
})



router.post('/' , (req,res)=>{
    
    const username=req.body.username;
    
      const date_of_payment=req.body.date_of_payment;
   
      let month;
      if(date_of_payment!=""){
      const str=date_of_payment.substr(5,2);
       month = parseInt(str, 10);
      }
          const uuid = uuidv4();

    var sql = `select * from register where  username =  "${username}" and month=${month}`;
    mysql.query(sql , (err,result)=>{
       
       if (result && result.length !== undefined && result.length !== null && result.length !== 0) {
            
            sql = `select * from register where username =  "${username}" and transaction_id is NULL`;
        
            mysql.query(sql , (err,result)=>{
                
               if (result && result.length !== undefined && result.length !== null && result.length !== 0) {
                    
                    sql = `update register set transaction_id ="${uuid}",date_of_payment ="${date_of_payment}" where username =  "${username}" and transaction_id is NULL`;

                    mysql.query(sql , (err,user)=>{
                        req.session.user ={
                            
                            username:username,
                            
                        }
                      
                        return res.send('sucess');
                       
                    })
                
            }
            else
            {
                return res.redirect('/userdashboard');
                    
            }
        });

       
    }
    else
    {
        return res.redirect('/userdashboard');
       
            
    }
        
            });



        })

module.exports = router;