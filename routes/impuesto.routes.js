const express = require("express");
const router= express.Router();
const Impuesto = require("../controllers/impuesto.controller")

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE COMPANIAS
router.get('/getImpuestos',Impuesto.getImpuestos);
router.post('/createImpuesto',Impuesto.crearImpuesto);
router.post('/updateImpuesto',Impuesto.actualizarImpuesto);
router.post('/deleteImpuesto',Impuesto.deleteImpuesto);

module.exports= router;