const express = require("express");
const router= express.Router();
const Productos= require("../controllers/productos.controller");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE Invenarios
router.get('/getProducto',authenticate.authMiddleware,Productos.getProducto);
router.get('/getProductoByCompania/:id',authenticate.authMiddleware,Productos.getProductoByCompania);
router.get('/getProductoByUser/:id',authenticate.authMiddleware,Productos.getProductoByUser);
router.post('/addProducto',Productos.createProducto);
router.post('/updateProducto/:id',Productos.updateProducto);
router.post('/deleteProducto/:id',Productos.deleteProducto);

module.exports= router;