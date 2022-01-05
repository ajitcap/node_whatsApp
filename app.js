const express = require('express');
const jwt_decode = require('jwt-decode');
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const sql = require('./config/db');

app.post("/link-click-analytics", verifyToken, function (req, res) {
    try {
        query = "use analytics_skalav2"

        sql.query(query, function (err, result1) {
            if (err) throw err;
            query = "CALL eforcelink_click_analytics(?)"
            var values = [[req.body.user_id, req.body.eforce_link, req.body.whatsapp_queue_id, req.body.mobile_number, req.body.email_id, req.body.operation_id]];

            sql.query(query, values, function (err, result) {
                if (err) {
                    res.status(500).json({
                        statusCode: 500,
                        message: "Failure",
                        data: err['sqlMessage']
                    });
                }
                res.status(200).json({
                    statusCode: 200,
                    message: "success",
                    data: result
                });
            });
        });

    } catch (exception) {
        console.log("err", err);
        return res.status(500).json({
            error: err
        })
    }
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        var decodedToken = jwt_decode(bearerToken);
        queryD = "use users_skalav2"

        sql.query(queryD, function (err, result1) {
            if (err) throw err;
            queryD = "select * from users_skalav2.user_active_logged_in where user_id=?";
            var values = [decodedToken.user_id];

            sql.query(queryD, values, function (err, result) {
                if (err) {
                    res.status(500).json({
                        statusCode: 500,
                        message: "Failure",
                        data: err['sqlMessage']
                    });
                }
                if (result.length > 0 && result[0].access_token == 'b\'' + bearerToken + '\'') {
                    next()
                }
                else {
                    res.status(403).json({
                        statusCode: 403,
                        message: "Unauthorised User!",

                    });
                }
            });
        });

        // if (decodedToken.user_id != null) {
        //     next();
        // } else {
        //     res.status(403).json({
        //         statusCode: 403,
        //         message: "Unauthorised User!"
        //     });
        // }
    } else {
        console.log("Forbidden-------------");
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = app;