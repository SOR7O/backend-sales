const express = require("express");
const router= express.Router();
const Compania= require("../controllers/compania.controllers");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE COMPANIAS
router.get('/getCompanias',authenticate.authMiddleware,Compania.getCompania);
router.post('/addCompania',Compania.createCompania);
router.post('/updatetCompania',Compania.updateCompania);
router.post('/deleteCompania',Compania.deleteCompania);

module.exports= router;