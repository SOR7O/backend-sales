const express = require("express");
const router = express.Router();
const ImpuestoController = require("../controllers/impuesto.controller");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const AuthController = require("../middleware/authenticate");
//RUTAS DE CRUD DE COMPANIAS
router.post(
  "/getImpuestos",
  AuthController.authMiddleware,
  ImpuestoController.getImpuestos,
);
router.post(
  "/createImpuesto",
  AuthController.authMiddleware,
  ImpuestoController.crearImpuesto,
);
router.put(
  "/updateImpuestoById/:id",
  AuthController.authMiddleware,
  ImpuestoController.actualizarImpuesto,
);
router.delete(
  "/deleteImpuestoById/:id",
  AuthController.authMiddleware,
  ImpuestoController.deleteImpuesto,
);

module.exports = router;
