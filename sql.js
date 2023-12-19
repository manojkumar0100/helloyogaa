const mysql = require('mysql2');
const db = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    // password:"helloyogaa",
    database:"helloyogaa"
})
db.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("DataBase is connected");
})
var sql = `select * from admin`;
db.query(sql , (err,result)=>{
    console.log(result);
})