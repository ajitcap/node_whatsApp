var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "43.241.39.78",
    user: "eforce_v2_user",
    password: "eforce_v2_pass",
    multipleStatements:true
    // database: "general_contractor_dev"
});

connection.connect(function(err) {
    if (err) {
        console.log(err); 
        throw err;
    }
    console.log("Database Connected!");
});

module.exports = connection;