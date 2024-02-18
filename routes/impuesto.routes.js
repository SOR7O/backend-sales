const express = require("express");
const router= express.Router();
const Impuesto = require("../controllers/impuesto.controller")

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE COMPANIAS
router.post('/getImpuestos',Impuesto.getImpuestos);
router.post('/createImpuesto',Impuesto.crearImpuesto);
router.put('/updateImpuestoById/:id',Impuesto.actualizarImpuesto);
router.delete('/deleteImpuestoById/:id',Impuesto.deleteImpuesto);

module.exports= router;