const express  = require("express");
const servidor = express();

servidor.set("port", process.env.PORT || 3000);

servidor.get("/", function (req, res){
    res.send("Conectado");
    res.end
})


servidor.listen(servidor.get("port"), function(){
    console.log("Sevidor conectado desde el puerto:"+servidor.get("port"))
});