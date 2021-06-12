const { exec } = require("child_process");

exec("cd ./Master && npm start");
exec("cd ./Users && npm start");
exec("cd ./Products && npm start");
exec("cd ./Orders && npm start");