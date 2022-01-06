const express  = require('express');
const jwt_decode = require('jwt-decode');

const whatsapp_report= express();

var cors = require("cors");
whatsapp_report.use(cors());

whatsapp_report.use(express.json());



const db=require('./config/db');


whatsapp_report.get('/demo', (req,response)=>{
    try {
        let is_active=req.query.is_active;

        let status=req.query.status

        console.log("is_active-->",is_active);
        console.log("status-->",status);



        let query="SELECT * FROM whatsapp_skalav2.whatsapp_queue"

        db.query(query,(error,res)=>{
            // console.log("result",res);

            response.status(200).json({
                status:200,
                data:res
            })
        })
        
    } catch (error) {
        console.log("error-->",error);
    }
})


console.log("db ",db);





module.exports=whatsapp_report;