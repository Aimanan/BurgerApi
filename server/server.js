// const async = () => {
//     return Promise.resolve();
// };

// const config = require('./config');
// const https = require('https');
// const fs = require('fs');

// async()
//     .then(() => require('./db').init(config.conncetionString))
//     .then((db) => require('./data').init(db))
//     .then((data) => require('./app').init(data))
//     .then((app) => {
//         // https.createServer({
//         //     key: fs.readFileSync('./server/system/certificate/ia.key'),
//         //     cert: fs.readFileSync('./server/system/certificate/ia.crt')
//         //   }, app).listen(config.port, () => console.log(`Take a burger at port ${config.port}`));

//         // I failed to validate the SSL certificate. Use the upper rows for unsecured https connection

//         app.listen(config.port, () => console.log(`Take a burger at port ${config.port}`));
//     });

const config = require('./config');

async function asyncServer () {
    const db=await require('./db').init(config.conncetionString);
    const data=await require('./data').init(db);
    const app= await require('./app').init(data);
    await app.listen(config.port, () => console.log(`Take a burger at port ${config.port}`));     
}

asyncServer();