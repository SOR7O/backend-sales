const express = require("express");
const router = express.Router();
const ProductosController = require("../controllers/productos.controller");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const AuthController = require("../middleware/authenticate");
//RUTAS DE CRUD DE productos
router.get("/", (req, res, next) => {
  res.send("ruta de productos");
});
router.get("/getProductos", ProductosController.getProducto);
router.post(
  "/getProductoByCompania",
  AuthController.authMiddleware,
  ProductosController.getProductoByCompania,
);
router.get("/getProductoByUser", ProductosController.getProductoByUser);
router.post(
  "/addProducto",
  AuthController.authMiddleware,
  ProductosController.createProducto,
);
router.post(
  "/updateProducto",
  AuthController.authMiddleware,
  ProductosController.updateProducto,
);
router.post(
  "/deleteProducto",
  AuthController.authMiddleware,
  ProductosController.deleteProducto,
);

module.exports = router;
