const express = require('express');
const jwt = require('jsonwebtoken');
const route = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtSecretyKey = '2AE458DA29E526148A71527CE19FB'; 

db.connection.connect();

// Main app route
route.get('/*', (req, res, next)=>{
    res.sendStatus(200);
});

// Users route
route.post('/users/login', (req, res, next)=>{
    const password = req.body.password;
    const username = req.body.username;
    db.connection.query("SELECT * FROM users WHERE username = ?",[username], function (error, results, fields) {
        if (results.length > 0){
            const user = {
                id : results[0].id,
                username : results[0].username
            };
    
            bcrypt.compare(password, results[0].password, function(err, resp) {
                if(err)throw err;
                if(!resp){
                   res.json({message : "Invalid password!"});
                }
                jwt.sign({user}, jwtSecretyKey,{expiresIn : "1 day"}, (error, token) =>{
                    res.json({token});
                });
            });
        }else{
            res.json({message : "Invalid username!"});
        }
    });
});

// User data route
route.get('/users/me', checkToken, (req, res)=>{
    jwt.verify(req.token, jwtSecretyKey, (err, user) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({user});
        }
    });
});

// User logout route
route.get('/users/logout', checkToken, (req, res)=>{
    jwt.verify(req.token, jwtSecretyKey, (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({});
        }
    });
});

// Checking token
function checkToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    }else{
        res.sendStatus(403);
    }
}

// Products routes
// creating a new product
route.post('/products', checkToken, (req, res)=>{

    jwt.verify(req.token, jwtSecretyKey, (err, auth) => {
        const product = [
            req.body.name,
            req.body.price,
            req.body.amount,
            auth.user.id
        ];
        if(err){
            res.sendStatus(403);
        }else{
            db.connection.query("INSERT INTO products (name, price, amount, userid) VALUES(?, ?, ?, ?)",product, function (error, results, fields) {
                if(err) throw err;
                res.json({message : "Product was created!"});
            });
        }
    });
});

// fetch products
route.get('/products', checkToken, (req, res)=>{
    jwt.verify(req.token, jwtSecretyKey, (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            limit = req.body.limit
            userid = [data.user.id];
            db.connection.query("SELECT * FROM products WHERE userid = ? LIMIT 5", userid, function (error, results, fields) {
                if(err) throw err;
                res.json({results});
            });
        }
    });
});

// fetch products changing the limit of rows
route.get('/products/page', checkToken, (req, res)=>{
    jwt.verify(req.token, jwtSecretyKey, (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            limit = req.query.limit;
            userid = [data.user.id];
            db.connection.query(`SELECT * FROM products WHERE userid = ? LIMIT ${limit}`, userid, function (error, results, fields) {
                if(err) throw err;
                res.json({results});
            });
        }
    });
});

// fetch product by id
route.get('/products/:id', checkToken, (req, res)=>{
    jwt.verify(req.token, jwtSecretyKey, (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            id = [req.params.id];
            db.connection.query("SELECT * FROM products WHERE id = ?",id, function (error, results, fields) {
                if(err) throw err;
                res.json({results});
            });
        }
    });
});

// update product
route.put('/products/:id', checkToken, (req, res)=>{
    jwt.verify(req.token, jwtSecretyKey, (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            const product = [
                req.body.name,
                req.body.price,
                req.body.amount,
                req.params.id
            ];
            db.connection.query("UPDATE products SET name = ?, price = ?, amount = ? WHERE id = ?",product, function (error, results, fields) {
                if(err) throw err;
                res.json({message : "Product was updated!!"});
            });
        }
    });
});

// delete product by id
route.delete('/products/:id', checkToken, (req, res)=>{
    jwt.verify(req.token, jwtSecretyKey, (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            id = [req.params.id];
            db.connection.query("DELETE FROM products WHERE id = ?", id, function (error, results, fields) {
                if(err) throw err;
                res.json({message : "Product was deleted!"});
            });
        }
    });
});

module.exports = route;