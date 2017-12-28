const async = () => {
    return Promise.resolve();
};

const config = require('./config');
//const http = require('http');
const https = require('https');

async()
    .then(() => require('./db').init(config.conncetionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        // https.createServer({
        //     key: fs.readFileSync('key.pem'),
        //     cert: fs.readFileSync('cert.pem')
        //   }, app).listen(config.port, () => console.log(`Take a burger at port ${config.port}`))   
      
        app.listen(config.port, () => console.log(`Take a burger at port ${config.port}`));         
    });
