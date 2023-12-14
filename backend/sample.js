
const express = require("express");
const path = require("path");
const app = express();

const {parse} = require("querystring");

const cors = require('cors');



const mysql = require("mysql");
const exp = require("constants");
const { copyFileSync } = require("fs");

//parse
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//setting ejs



var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "123456",
    database : "worldcup"
});

connection.connect(function(error){
    if (error)
    {
        console.log(error);
    }
    else{
        console.log("connected");
    }
});



// app.get('/',function(req,res){

//     res.sendFile(path.join(__dirname,"getData.html"));
// });

app.post("/fetch",function(req,res){
    var team_name = req.body.runs;
    
    var sql = `select player_id,p_name,type_of_player,age from player where team_id = (select team_id from team where team_name="${team_name}");`;
   
    // var sql = `select * from ${team_name}`

    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, error: err.message });
        } else {
            let result = [...rows];
            // console.log(rows);
            res.send({ success: true, data: result });
        }
    });

});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});