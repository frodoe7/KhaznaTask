const loginSchema = {
    type: "object",
    required: ["email","password"],
    properties: {
      email: {type: "string",minLength:6,maxLength:60},
      password: {type: "string",minLength:6,maxLength:60}
    },
    additionalProperties: false
};

const registerSchema = {
    type: "object",
    required: ["email","name","password","balance","maxAllowed"],
    properties: {
      email: {type: "string",minLength:6,maxLength:60},
      password: {type: "string",minLength:6,maxLength:60},
      name: {type: "string",minLength:2,maxLength:60},
      balance: {type: "number",minimum:0,maximum:500000},
      maxAllowed: {type: "number",minimum:1,maximum:50000},
    },
    additionalProperties: false
};

module.exports = { loginSchema , registerSchema };