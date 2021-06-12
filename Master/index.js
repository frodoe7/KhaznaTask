const express = require('express');
const axios = require('axios').default;
const app = express();

const baseUrl = "http://localhost:";

app.use(express.json());

const servicesStructure = {
    user : 3001,
    product : 3002,
    order : 3003
};

app.all("*" , (request,response) => {
    var originUrl = request.originalUrl;
    var routedPath = originUrl.split('/')[1];
    var routedPort = servicesStructure[routedPath];

    if (!routedPort)
    {
        response.status(400).send({ success : false , error : "Bad request" });
        return;
    }
    
    var routedUrl = baseUrl + routedPort + originUrl;

    axios(routedUrl , {
        method : request.method,
        data : request.body,
        headers : request.headers,
        params : request.params
    }).then(data => {
        response.status(200).send(data.data);
    }).catch(error => {
        response.status(error.response.status).json(error.response.data);
    })
})

app.listen(3000 , () => {
    console.log("App Started");
});