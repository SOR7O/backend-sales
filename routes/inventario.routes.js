const express = require("express");
const router= express.Router();
const Inventario= require("../controllers/inventario.controller");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE Invenarios
router.get('/getInventario',authenticate.authMiddleware,Inventario.getInventario);
router.get('/getInventarioByCompania/:id',authenticate.authMiddleware,Inventario.getinventarioByCompania);
router.get('/getInventarioByUser/:id',authenticate.authMiddleware,Inventario.getinventarioByUser);
router.post('/createInventario',Inventario.createInventario);
router.post('/updateInventario/:id',Inventario.updateInventario);
router.post('/deleteInventario/:id',Inventario.deleteInventario);

module.exports= router;