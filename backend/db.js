
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "worldcup",
    multipleStatements: true
});

connection.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Connected to the database");

    }
});

module.exports = connection;
