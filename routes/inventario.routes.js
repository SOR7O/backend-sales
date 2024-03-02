const express = require("express");
const router = express.Router();
const InventarioController = require("../controllers/inventario.controller");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const AuthController = require("../middleware/authenticate");
//RUTAS DE CRUD DE Invenarios
router.get(
  "/getInventario",
  AuthController.authMiddleware,
  InventarioController.getInventario,
);
router.post(
  "/getInventarioByCompany/:id",
  AuthController.authMiddleware,
  InventarioController.getinventarioByCompania,
);
router.get(
  "/getInventarioByUser/:id",
  AuthController.authMiddleware,
  InventarioController.getinventarioByUser,
);
router.post(
  "/createInventario",
  AuthController.authMiddleware,
  InventarioController.createInventario,
);
router.put(
  "/updateInventario",
  AuthController.authMiddleware,
  InventarioController.updateInventario,
);
router.delete(
  "/deleteInventarioById/:id",
  AuthController.authMiddleware,
  InventarioController.deleteInventario,
);

module.exports = router;
