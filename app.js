const express = require('express');
const Client = require('node-rest-client').Client;
const jwt_decode = require('jwt-decode');
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const sql = require('./config/db');
const http = require('http');

// app.get("/ajit", (req, res) => {
//     try {
//         query = "select *from whatsapp_skalav2.whatsapp_queue"
//         sql.query(query, (err, result) => {
//             if (err) throw err;
//             res.status(200).json({
//                 status: 200,
//                 data: result
//             });
//         })
//     } catch (e) {
//         console.log(e)
//     }
// })

// app.post("/link-click-analytics", verifyToken, function (req, res) {
//     try {
//         query = "use analytics_skalav2"

//         sql.query(query, function (err, result1) {
//             if (err) throw err;
//             query = "CALL eforcelink_click_analytics(?)"
//             var values = [[req.body.user_id, req.body.eforce_link, req.body.whatsapp_queue_id, req.body.mobile_number, req.body.email_id, req.body.operation_id]];

//             sql.query(query, values, function (err, result) {
//                 if (err) {
//                     res.status(500).json({
//                         statusCode: 500,
//                         message: "Failure",
//                         data: err['sqlMessage']
//                     });
//                 }
//                 res.status(200).json({
//                     statusCode: 200,
//                     message: "success",
//                     data: result
//                 });
//             });
//         });

//     } catch (exception) {
//         console.log("err", err);
//         return res.status(500).json({
//             error: err
//         })
//     }
// });

app.post("/user/store-demo-user", function (req, res) {
    try {
        query = "use users_skala2_2"

        sql.query(query, function (err, result1) {
            if (err) throw err;
            query = "select *from user where mobile_no=?"
            values = [req.body.mobile_no]

            sql.query(query, values, function (err, result) {
                if (err) {
                    res.status(500).json({
                        statusCode: 500,
                        message: "Failure",
                        data: err['sqlMessage']
                    });
                }
                if (result.length > 0) {
                    res.status(400).json({
                        statusCode: 400,
                        message: "User Already Exists!"
                    });
                } else {
                    query = "select *from users_demo where mobile_no=?"
                    values = [req.body.mobile_no]

                    sql.query(query, values, function (err, userDemo) {
                        if (err) {
                            res.status(500).json({
                                statusCode: 500,
                                message: "Failure",
                                data: err['sqlMessage']
                            });
                        }
                        if (userDemo.length > 0) {
                            res.status(400).json({
                                statusCode: 400,
                                message: "User Already Exists!"
                            });
                        } else {
                            query = "CALL demo_user_add(?)"
                            var values = [[req.body.user_name, req.body.mobile_no, req.body.user_type, req.body.tc_accepted, req.body.whatsapp_accepted, req.body.device_type]];
                            sql.query(query, values, function (err, demoUser) {
                                if (err) {
                                    res.status(500).json({
                                        statusCode: 500,
                                        message: "Failure",
                                        data: err['sqlMessage']
                                    });
                                }
                                res.status(200).json({
                                    statusCode: 200,
                                    message: "User Added Successfully!",
                                    data: demoUser
                                });

                            });
                        }
                    });
                }
            });
        });

    } catch (exception) {
        console.log("err", err);
        return res.status(500).json({
            statusCode: 500,
            message: "Failure",
            data: err
        })
    }
});

app.get("/user/get-demo-dashboard-count", function (req, res) {
    try {
        query = "call dashboard_skala2_2.dashboard_counts()"

        sql.query(query, function (err, result) {
            if (err) {
                res.status(500).json({
                    statusCode: 500,
                    message: "Failure",
                    data: err['sqlMessage']
                });
            }
            res.status(200).json({
                statusCode: 200,
                message: "Demo Scheduled Successfully!",
                data: result[0][0]
            });
        });
    } catch (exception) {
        console.log("err", err);
        return res.status(500).json({
            statusCode: 500,
            message: "Failure",
            data: err
        })
    }
});

app.post("/user/schedule-demo", function (req, res) {
    try {

        // saveLink();
        query = "use users_skala2_2"

        sql.query(query, function (err, result1) {
            if (err) throw err;
            query = "select *from demo_schedule where mobile_number=?"
            values = [req.body.mobile_number]

            sql.query(query, values, function (err, result) {
                if (err) {
                    res.status(500).json({
                        statusCode: 500,
                        message: "Failure",
                        data: err['sqlMessage']
                    });
                }
                if (result.length > 0) {
                    res.status(400).json({
                        statusCode: 400,
                        message: "Demo already schedule for this mobile number!"
                    });
                } else {
                    query = "CALL schedule_demo(?)"
                    const demoDate = new Date(req.body.demo_date);
                    var values = [[demoDate, req.body.user_name, req.body.mobile_number, req.body.email_id]];
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
                            message: "Demo Scheduled Successfully!"
                        });
                    });
                }
            });
        });

    } catch (exception) {
        console.log("err", err);
        return res.status(500).json({
            statusCode: 500,
            message: "Failure",
            data: err
        })
    }
});

app.get("/user/get-pricing-info", function (req, res) {
    try {
        query = "use users_skala2_2"

        sql.query(query, function (err, result1) {
            if (err) throw err;
            query = "select *from eforce_plan"

            sql.query(query, function (err, result) {
                if (err) {
                    res.status(500).json({
                        statusCode: 500,
                        message: "Failure",
                        data: err['sqlMessage']
                    });
                }
                res.status(200).json({
                    statusCode: 200,
                    message: "Demo Scheduled Successfully!",
                    data: result
                });
            });
        });

    } catch (exception) {
        console.log("err", err);
        return res.status(500).json({
            statusCode: 500,
            message: "Failure",
            data: err
        })
    }
});

async function saveLink() {
    const options = {
        host: 'graph.microsoft.com',
        // path : '/v1.0/communications/onlineMeetings',
        method: 'POST'
    }

    const client = Client.init(options);

    const onlineMeeting = {
        startDateTime: '2019-07-12T14:30:34.2444915-07:00',
        endDateTime: '2019-07-12T15:00:34.2464912-07:00',
        subject: 'User Token Meeting'
    };

    var response = await client.api('/me/onlineMeetings')
        .post(onlineMeeting);

    console.log("response====" + response);

    // var options = {
    //     host : 'graph.microsoft.com',
    //     path : '/v1.0/communications/onlineMeetings',
    //     method : 'GET'
    // }
    // var maybe = '';
    // console.log('till here')
    // var req = http.request(options, function(res){
    //     var body = "";
    //     print("/v1.0/communications/onlineMeetings/==="+ res)
    //     res.on('data', function(data) {
    //         console.log('data came');
    //         body += data;
    //     });
    //     res.on('end', function() {
    //         console.log('ended too');
    //         maybe = JSON.parse(body);
    //         console.log(maybe.city);
    //         response.send(maybe);
    //     });
    // });
    // console.log('here too man');
    // req.on('error', function(e) {
    //     console.log('Problem with request: ' + e.message);
    // });
    // res.end();
}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        var decodedToken = jwt_decode(bearerToken);
        queryD = "use users_skala2_2"

        sql.query(queryD, function (err, result1) {
            if (err) throw err;
            queryD = "select * from users_skala2_2.user_active_logged_in where user_id=?";
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