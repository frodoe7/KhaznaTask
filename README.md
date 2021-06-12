# Khazna Task

##### Database design

![Tables](https://i.imgur.com/ssNkgGf.png)

##### The project includes 3 services and master

1 - Master service > Route the requests to the correct service

2 - Users service

3 - Products service

4 - Orders service

#### Featured libraries I used
* express
* sequelize
* mysql2
* ws
* jsonwebtoken
* bcrypt
* ajv
* ajv-errors

#### Instructions

Install NPM packages in each service
> npm install

Set environment variables
* dbUsername > DB username
* dbPassword > DB password
* dbHost > DB host
* usersDBName > DB name for users
* productsDBName > DB name for products
* ordersDBName > DB name for orders
* JWTSecretKey > secret key for JWT verify/sign
* internalSecretKey > internal secret key between services as a second layer of security

Run the project
> node start.js
