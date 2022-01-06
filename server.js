const http = require('http');
const app = require('./app');
const whatsapp_report =require('./whatsapp_report');
const port = 8000;
const port1 = 8001;

const server = http.createServer(app);

const whatsapp_server =http.createServer(whatsapp_report);

whatsapp_report.listen(port1,()=>{
    console.log("port also runntin on same port",port1);
})


server.listen(port,()=>{console.log('Server is Running on '+ port)});