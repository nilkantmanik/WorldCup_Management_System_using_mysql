const express = require("express");
const app = express();
const cors = require('cors');

// Parse incoming requests with JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import the database connection
const connection = require('./db');


app.post("/teamplayers/:teamname",function(req,res){
    var team_name = req.params.teamname;
    
    var sql = `SELECT player_id, p_name, type_of_player, age,no_matches,run_scored,wickets FROM player WHERE team_id = (SELECT team_id FROM team WHERE team_name="${team_name}");`;

    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, error: err.message });
        } else {
            let result = [...rows];
            
            res.send({ success: true, data: result });
        }
    });
});

app.get("/pointstable",function(req,res){

    var sql =`SELECT * FROM team ORDER BY no_of_wins DESC;`;


    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, error: err.message });
        } else {
            let result = [...rows];
            
            res.send({ success: true, data: result });
        }
    });

});

app.get("/teams",function(req,res){

    var sql =`SELECT * FROM team;`;

    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, error: err.message });
        } else {
            let result = [...rows];
            
            res.send({ success: true, data: result });
        }
    });

});


app.post("/addteam",function(req,res){

    var team_id=req.body.teamid;
    var team_name=req.body.teamname;
    var team_owner=req.body.teamowner;
    var no_of_players=req.body.noofplayers;

    var sql =`INSERT INTO team VALUES ("${team_id}","${team_name}" , 0, "${team_owner}"," ${no_of_players}");`;

    connection.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, error: err.message });
        } else {
                       
            res.send({ success: true });
        }
    });

});


// app.post("/updatewins",function(req,res){

//     var team_name=req.body.teamname;
//     var wins=req.body.win;

    
//     var sql = `update team set no_of_wins="${wins}" where team_id = (SELECT team_id FROM team WHERE team_name="${team_name}");`;



//     connection.query(sql, function (err, rows, fields) {
//         if (err) {
//             console.log(err);
//             res.send({ success: false, error: err.message });
//         } else {
//             let result = [...rows];
            
//             res.send({ success: true});
//         }
//     });

// });


app.post("/updatewins", function (req, res) {
    var team_name = req.body.teamname;
    var wins = req.body.win;

    // Use a parameterized query to prevent SQL injection
    var sqlSelect = `SELECT team_id FROM team WHERE team_name = "${team_name}"`;
    
    connection.query(sqlSelect, [team_name], function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.send({ success: false, error: err.message });
        } else {
            if (rows.length === 0) {
                // The team doesn't exist
                res.send({ success: false, error: 'Team not found.' });
            } else {
                // The team exists, proceed with the update
                var teamId = rows[0].team_id;

                var sqlUpdate = `UPDATE team SET no_of_wins = "${wins}" WHERE team_id = "${teamId}"`;

                connection.query(sqlUpdate, [wins, teamId], function (err, result) {
                    if (err) {
                        console.log(err);
                        res.send({ success: false, error: err.message });
                    } else {
                        res.send({ success: true });
                    }
                });
            }
        }
    });
});



app.delete('/deleteteam', (req, res) => {
    var name = req.body.teamname;
    var sql = 'DELETE FROM team WHERE team_name = ?';
  
    connection.query(sql, [name], (err, result) => {
      if (err) {
        console.error(err);
        res.send({ success: false, error: err.message });
      } else {
        console.log('Deleted:', result.affectedRows, 'rows');
        res.send({ success: true });
      }
    });
  });






const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

