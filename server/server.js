const async = () => {
    return Promise.resolve();
};

const config = require('./config');
const http = require('http');
const https = require('https');
const fs = require('fs');

async()
    .then(() => require('./db').init(config.conncetionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        https.createServer({
            key: fs.readFileSync('./server/system/certificate/ia.key'),
            cert: fs.readFileSync('./server/system/certificate/ia.crt')
          }, app).listen(config.port, () => console.log(`Take a burger at port ${config.port}`));   
        //app.listen(config.port, () => console.log(`Take a burger at port ${config.port}`));         
    });
