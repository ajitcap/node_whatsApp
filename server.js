const http = require('http');
const app = require('./app');
const whatsapp_report =require('./whatsapp_report');
const kyc_rating_score =require('./Kyc_rating_sccore');
const kyc_rating = require('./Kyc_rating_sccore');
const port = 8000;
const port1 = 8001;
const kyc_rating_port=8002

const server = http.createServer(app);

const whatsapp_server =http.createServer(whatsapp_report);

whatsapp_report.listen(port1,()=>{
    console.log("port also runntin on same port",port1);
})


kyc_rating_score.listen(kyc_rating_port,()=>{
    console.log("kyc port", kyc_rating_port);
})


server.listen(port,()=>{console.log('Server is Running on '+ port)});