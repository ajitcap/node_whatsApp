var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "65.0.63.7",
    user: "eforce_v2_user",
    password: "eforce_v2_pass",
    database: "users_skala2_2"
});

connection.connect(function(err) {
    if (err) {
        console.log(err); 
        throw err;
    }
    console.log("Database Connected!");
});

module.exports = connection;