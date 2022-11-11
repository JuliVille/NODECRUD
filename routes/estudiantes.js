const express  = require("express");
const ruta     = express.Router();
const conexion = require("../conexion.js");

ruta.get("/",function(req, res){
    conexion.query("SELECT * FROM estudiantes",function(error, filas, campos){
        if(!error){
            res.render("../views/index",{contenido:filas});
        }else{
            res.send(error);
        }
    });    
});

ruta.get("/registrar",function(req, res){
    res.render("../views/frmRegistro");
});

ruta.post("/registrar",function(req, res){
    const {nombre , pApellido, sApellido, codigo, correo, telefono, fechaNac} = req.body;
    conexion.query("INSERT INTO estudiantes(EST_NOMBRE,EST_PRIMER_APELLIDO,EST_SEGUNDO_APELLIDO,EST_CODIGO,EST_CORREO,EST_TELEFONO,EST_FECHA_NAC)VALUES(?,?,?,?,?,?,?)",
    [nombre , pApellido, sApellido, codigo, correo, telefono, fechaNac],function(error, filas, campos){
        if(!error){
            res.send(`Estudiante registrado <br> <a href="/">Ir a inicio</>`)
        }else{
            res.send(error);
        }
    });
});

ruta.get("/eliminar/:id",function(req, res){
    const {id} = req.params;
    conexion.query("DELETE FROM estudiantes WHERE EST_ID = ?",
    [id],function(error, filas, campos){
        if(!error){
            res.send(`Estudiante eliminado <br> <a href="/">Ir a inicio</>`)
        }else{
            res.send(error);
        }
    });
});

ruta.get("/editar/:id",function(req, res){
    const {id} = req.params;
    conexion.query("SELECT * FROM estudiantes WHERE EST_ID = ? ",[id], function(error, filas, campos){
        if(!error){
            res.render("../views/frmEditar",{contenido:filas});
        }else{
            res.render(error);
        }
    })
});

ruta.post("/editar/:id",function(req, res){
    const {nombre , pApellido, sApellido, codigo, correo, telefono, fechaNac} = req.body;
    const {id} = req.params;
    conexion.query(`UPDATE estudiantes SET EST_NOMBRE = ?, EST_PRIMER_APELLIDO = ?, EST_SEGUNDO_APELLIDO = ?, EST_CODIGO = ?, EST_CORREO = ?,
    EST_TELEFONO = ?, EST_FECHA_NAC = ? WHERE EST_ID = ?`,
    [nombre, pApellido, sApellido, codigo, correo, telefono, fechaNac, id],function(error, filas, campos){
        if(!error){
            res.send(`Estudiante Editado <br> <a href="/">Ir a inicio</>`)
        }else{
            res.send(error);
        }
    });
});

module.exports = ruta;