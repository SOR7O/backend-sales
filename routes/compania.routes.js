const express = require("express");
const router= express.Router();
const Compania= require("../controllers/compania.controllers");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE COMPANIAS
router.get('/getCompanias',Compania.getCompania);
router.post('/createCompania',Compania.createCompania);
router.post('/updateCompania',Compania.updateCompania);
router.post('/deleteCompania',Compania.deleteCompania);

module.exports= router;