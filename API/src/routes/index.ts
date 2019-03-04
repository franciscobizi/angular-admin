import {getRepository} from "typeorm";
import {Users} from "../entity/Users";
import {Products} from "../entity/Products";
const express = require('express');
var jwt = require('jsonwebtoken');
const route = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtSecretyKey = '2AE458DA29E526148A71527CE19FB'; 

// Main app route
route.get('/', (req, res, next)=>{
    res.sendStatus(200);
});

// Users route
route.post('/users/login',(req, res, next)=>{
    getRepository(Users).findOne({
            username : req.body.username
    }).then((user) => {
            if(user == null){
                res.json({message : "Invalid username!"});
            }else{
                bcrypt.compare(req.body.password, user.password, function(err, resp) {
                    if(err)throw err;
                    if(!resp){
                       res.json({message : "Invalid password!"});
                    }
                    jwt.sign({id : user.id, username: user.username}, jwtSecretyKey,{expiresIn : "1 day"}, (error, token) =>{
                        res.json({token});
                    });
                });
            }     
    });
});

// User data route
route.get('/users/me', checkToken, jwtVerify, (req, res)=>{
    res.json(req.data);
});

// User logout route
route.get('/users/logout',checkToken, jwtVerify, (req, res)=>{
    
});

//get user data by verify user token
function jwtVerify(req, res, next){
    jwt.verify(req.token, jwtSecretyKey, (err, user) => {
        if(err){
            res.sendStatus(403);
        }else{
            req.data = user;
            next();
        }
    });
}
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
route.post('/products',checkToken, jwtVerify, (req, res)=>{
    const product = {
        name : req.body.name,
        price : req.body.price,
        amount : req.body.amount,
        userid : req.data.id
    };
    getRepository(Products).save(
        product
    ).then((resp)=>{
         if(resp != null){
            res.json({message : "Product was created!"});
         }else{
            res.json({message : "Product not created!"});
         }   
    });
});

// fetch products
route.get('/products',checkToken, jwtVerify, async(req, res)=>{
    let product = await getRepository(Products)
    .createQueryBuilder("products")
    .where("(products.userid = :productsUserid)")
    .orderBy("products.id", "DESC")
    .take(5)
    .setParameters({ productsUserid: req.data.id })
    .getMany();
    if(product != null){
        res.json({product});
    }else{
        res.json({message : "Product not found!"});
    }

});

// fetch products changing the limit of rows
route.get('/products/page',checkToken, jwtVerify, async(req, res)=>{
    let product = await getRepository(Products)
    .createQueryBuilder("products")
    .where("(products.userid = :productsUserid)")
    .orderBy("products.id", "DESC")
    .take(req.query.limit)
    .setParameters({ productsUserid: req.data.id })
    .getMany();
    if(product != null){
        res.json({product});
    }else{
        res.json({message : "Product not found!"});
    }
});

// fetch product by id
route.get('/products/:id',checkToken, jwtVerify, async(req, res)=>{
    let product = await getRepository(Products)
    .createQueryBuilder("products")
    .where("(products.userid = :productsUserid AND products.id = :productsId)")
    .setParameters({ productsUserid : req.data.id, productsId : req.params.id})
    .getMany();
    if(product != null){
        res.json({product});
    }else{
        res.json({message : "Product not found!"});
    }
});

// update product
route.put('/products/:id',checkToken, jwtVerify, async (req, res)=>{
    const product = {
        name : req.body.name,
        price : req.body.price,
        amount : req.body.amount
    };
    let updatedProduct = await getRepository(Products)
    .createQueryBuilder()
    .update(Products)
    .set(product)
    .where("id = :id", { id: req.params.id })
    .execute();
    if(updatedProduct != null){
        res.json({message : "Product was updated!!"});
    }else{
        res.json({message : "Product not updated!!"});
    }
});

// delete product by id
route.delete('/products/:id',checkToken, jwtVerify, async(req, res)=>{
    let deletedProduct = await getRepository(Products)
    .createQueryBuilder()
    .delete()
    .from(Products)
    .where("id = :id", { id: req.params.id })
    .execute();
    if(deletedProduct != null){
        res.json({message : "Product was deleted!!"});
    }else{
        res.json({message : "Product not deleted!!"});
    }
});

module.exports = route;