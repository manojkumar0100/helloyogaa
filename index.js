const express = require('express');
const mysql = require('./database');
const session = require('express-session')
const middleware = require('./middleware')
const bp = require('body-parser');
const app = express();
app.use(bp.urlencoded({extended:true}));

const port = process.env.PORT || 5000;
app.use(express.static(__dirname+"/public"));
app.set('view engine' , 'ejs');

app.use(session({
    secret:"helloyogaa",
    resave:false,
    saveUninitialized:false
}))

const homeRouter = require('./Routers/homeRouter');
app.use('/' , homeRouter);

const loginRouter = require('./Routers/loginRouter');
app.use('/login' , loginRouter);

const adminLogin = require('./Routers/adminLogin');
app.use('/adminLogin' , adminLogin);

const register = require('./Routers/register');
app.use('/register' , register);

const userdashboard = require('./Routers/userdashboard');
app.use('/userdashboard' , userdashboard);


const registermonth = require('./Routers/registermonth');
app.use('/registermonth' , registermonth);

const payment = require('./Routers/payment');
app.use('/payment' , payment);


const admindashboard = require('./Routers/admindashboard');
app.use('/admindashboard' , admindashboard);





app.get('/logout' , (req,res)=>{
    req.session.user = null;
    res.redirect('/');
})





app.listen(port , ()=>{
    console.log("Server is running at port:"+port);
})