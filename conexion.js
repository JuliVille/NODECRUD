const mysql = require("mysql2");
const conexion = mysql.createConnection({
    host:     "localhost",
    user:     "root",
    password: "",
    database: "BDESTUDIANTE"
});
conexion.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conectado a la BD");
    }
});

module.exports = conexion;