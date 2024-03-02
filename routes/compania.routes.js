const express = require("express");
const router = express.Router();
const CompaniaController = require("../controllers/compania.controllers");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const AuthController = require("../middleware/authenticate");
//RUTAS DE CRUD DE COMPANIAS
router.post(
  "/getCompanias",
  AuthController.authMiddleware,
  CompaniaController.getCompania,
);
router.post(
  "/createCompania",
  AuthController.authMiddleware,
  CompaniaController.createCompania,
);
router.post(
  "/updateCompania",
  AuthController.authMiddleware,
  CompaniaController.updateCompania,
);
router.post(
  "/deleteCompania",
  AuthController.authMiddleware,
  CompaniaController.deleteCompania,
);

module.exports = router;
