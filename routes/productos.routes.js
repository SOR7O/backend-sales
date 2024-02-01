const express = require("express");
const router = express.Router();
const Productos = require("../controllers/productos.controller");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate = require("../middleware/authenticate")
//RUTAS DE CRUD DE productos
router.get("/",(req, res, next)=>{
    res.send("ruta de productos")
})
router.get('/getProductos',Productos.getProducto);
router.post('/getProductoByCompania', authenticate.authMiddleware, Productos.getProductoByCompania);
router.get('/getProductoByUser', Productos.getProductoByUser);
router.post('/addProducto', authenticate.authMiddleware, Productos.createProducto);
router.post('/updateProducto', authenticate.authMiddleware, Productos.updateProducto);
router.post('/deleteProducto', authenticate.authMiddleware, Productos.deleteProducto);

module.exports = router;