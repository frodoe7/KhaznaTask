const express = require("express");
var router = express.Router();
const { getProfile , createUser } = require("../controllers/user");
const { sign , verify } = require("jsonwebtoken");
const { checkHash, hashify } = require("../helpers/security");
const { loginSchema , registerSchema } = require('../schemas/user');

const Ajv = require("ajv").default;
const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv);

function validate(schema , data)
{
    const _validate = ajv.compile(schema)
    return _validate(data);
}

router.post("/user/login" , async (request , response) => {
    let data = request.body;
    let validated = validate(loginSchema , data);
    if (!validated)
    {
        response.status(422).send({ success : false , error : "Invalid payload format" });
        return;
    }
    
    let profile = await getProfile(data.email);
    if (!profile)
    {
        response.status(400).send({ success : false , error : "Invalid Credentials" });
        return;
    }

    checkHash(data.password , profile.password , (output) => {
        if (!output)
        {
            response.status(400).send({ success : false , error : "Invalid Credentials" });
            return;
        }

        let token = sign({ email : data.email } , process.env.JWTSecretKey);

        response.status(200).json({ success : true , token , data : profile.toJSON() });
        return;
    });
});

router.post("/user/register" , async (request , response) => {
    let data = request.body;
    let validated = validate(registerSchema , data);
    if (!validated)
    {
        response.status(422).send({ success : false , error : "Invalid payload format" });
        return;
    }

    let profile = await getProfile(data.email);

    if (profile)
    {
        response.status(400).send({ success : false , error : "This email already exist" });
        return;
    }

    hashify(data.password , async (hash) => {
        let user = await createUser(data.name , data.email , hash , data.balance , data.maxAllowed);

        if (user)
        {
            response.status(200).send({ success : true });
            return;
        }
        else
        {
            response.status(422).send({ success : false , error : "Error in adding the user" });
            return;
        }
    });
});

router.get("/user/me" , async (request , response) => {
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

        let email = decoded.email;
        let profile = await getProfile(email);

        response.status(200).send({ success : true , data : profile });
        return;
    });
});

module.exports = router;