import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
const route = require('./routes');

// create and setup express app
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, NoAuth, Authorization");
        next();
    });
    app.use('/api/v1', route);
    app.listen(process.env.PORT || '3000', ()=> {
        console.log(`Server is running on port: ${process.env.PORT} || '3000'`);
    });
}).catch(error => console.log("TypeORM connection error: ", error));