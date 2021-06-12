const express = require("express");
var router = express.Router();
const { get } = require('axios').default;
const { services } = require('../config');
const { fetchProductsByMaxAllowed , fetchProduct } = require("../controllers/product");
const { verify } = require("jsonwebtoken");

router.get("/product/all" , async (request , response) => {
    let token = request.headers.token;

    if (!token)
    {
        response.status(401).send({ success : false , error : "Invalid token" });
        return;
    }
    
    verify(token , process.env.JWTSecretKey , async (err,decoded) => {
        if (err)
        {
            response.status(401).send({ success : false , error : "Invalid token" });
            return;
        }

        get(services.user + "/me" , {
            headers : { token }
        }).then(async (data) => {
            let maxAllowed = data.data.data.maxAllowed;
            let products = await fetchProductsByMaxAllowed(maxAllowed);
    
            response.status(200).send({ success : true , data : products });
            return;
        }).catch(err => {
            response.status(401).send({ success : false , error : "Error in fetching products" });
            return;
        })
    });
});

router.get("/product/:id" , async (request , response) => {
    let token = request.headers.token;

    if (!token)
    {
        response.status(401).send({ success : false , error : "Invalid token" });
        return;
    }
    
    verify(token , process.env.JWTSecretKey , async (err,decoded) => {
        if (err)
        {
            response.status(401).send({ success : false , error : "Invalid token" });
            return;
        }

        let id = request.params.id;

        let product = await fetchProduct(id);

        response.status(200).send({ success : true , data : product });
        return;
    });
});

module.exports = router;