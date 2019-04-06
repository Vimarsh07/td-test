const express = require("express");
const app = express();
const mysql=require("mysql");
const bodyParser = require("body-parser");
const cors=require('cors');
const nodemailer = require('nodemailer');
const morgan = require('morgan'); 
const exphbs = require('express-handlebars');





const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(cors());









const connection = mysql.createConnection({
    host:"localhost",
    user:"tdtest",
    password:"node123@",
    database:"tdtest"
})

app.post("/insert",(req,res)=>{

   
    
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;

    
    
    bcrypt.hash(pass, saltRounds, function(err, hash) {
        
    var queryy = 'INSERT into register (name,email,pass) values ("'+name+'","'+email+'","'+hash+'")';
    
    connection.query(queryy,(err,rows,fields)=>{
        if(err)
        {
            res.json({
                status:400,
                success:false
            })
        } 
         else{
             res.json({
                 status:200,
                 success:true
             });
         }
            
        
      
    })
    // Store hash in your password DB.
}); 
})



    app.post("/login",(req,res)=>{
    var email=req.body.email;
    var Password=req.body.pass;
    var queryy='SELECT * from register where email="'+email+'"';

      connection.query(queryy,(err,result)=>{
        if(err)
        console.log(err)
        // res.send('Insert success.');
        else{
            console.log(result);
         if(result.length==0)
         {
             res.json({
                 status:404,
                 success:false
             })
         }
         else if( result.length==1)
         {
             if(result[0].pass==Password)
             {
            res.json({
                status:200,
                success:true
            })
        }
        else{
            res.json({
                status:400,
                success:false
            })
        }
        }
        else{
            res.json({
                status:400,
                success:false
            })
        }
        }
})

    }
    )

app.get("/",(req,res)=>{
    res.send("live");

})
app.listen(8082,()=>{console.log("the app is listening at port 8082 ")});
