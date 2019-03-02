const express = require('express');
const route = require('./routes');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

const app = express();
app.use((jsonParser, req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, NoAuth, Authorization");
    next();
});
app.use('/api/v1', route);

app.listen(process.env.PORT || '3000', ()=> {
    console.log(`Server is running on port: ${process.env.PORT} || '3000'`);
});