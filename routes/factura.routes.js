const express = require("express");
const router = express.Router();
const AuthController = require("../middleware/authenticate");
const CaiController = require("../controllers/cai.controller");
const FacturaController = require("../controllers/factura.controller");

//crud routes factura
router.post(
  "/saveFactura",
  AuthController.authMiddleware,
  FacturaController.createFactura,
);
router.post(
  "/deleteFacturaById/:id",
  AuthController.authMiddleware,
  FacturaController.deleteFacturaById,
);
router.post(
  "/getFacturaByCompania/:id",
  AuthController.authMiddleware,
  FacturaController.getFacturasByCompania,
);

// crud routes cai
router.post(
  "/getCaiByCompania/:id",
  AuthController.authMiddleware,
  CaiController.getCaiByCompania,
);
router.post("/createCai", AuthController.authMiddleware, CaiController.saveCai);
router.post(
  "/saveTipoFact",
  AuthController.authMiddleware,
  CaiController.saveTipoFactura,
);
router.put(
  "/updateCaiById/:id",
  AuthController.authMiddleware,
  CaiController.updateCai,
);
router.delete(
  "/deleteCaiById/:id",
  AuthController.authMiddleware,
  CaiController.deleteCai,
);

//rutas punto emision
router.post(
  "/createPuntoEmision",
  AuthController.authMiddleware,
  CaiController.savePuntoEmision,
);
router.post(
  "/getPuntosEmisionByCompania/:id",
  AuthController.authMiddleware,
  CaiController.getPuntosEmisionByCompany,
);
router.delete(
  "/deletePuntoEmisionById/:id",
  AuthController.authMiddleware,
  CaiController.deletePuntoEmision,
);
router.put(
  "/updatePuntoEmisionById/:id",
  AuthController.authMiddleware,
  CaiController.updatePuntoEmision,
);

//rutas establecimiento
router.post(
  "/createEstablecimiento",
  AuthController.authMiddleware,
  CaiController.saveEstablecimiento,
);
router.post(
  "/getEstablecimientoByCompania/:id",
  AuthController.authMiddleware,
  CaiController.getEstablecimientoByCompany,
);
router.delete(
  "/deleteEstablecimientoById/:id",
  AuthController.authMiddleware,
  CaiController.deleteEstablecimiento,
);
router.put(
  "/updateEstablecimientoById/:id",
  AuthController.authMiddleware,
  CaiController.updateEstablecimiento,
);

//rutas Tipos de documentos
router.post(
  "/createTipoDocumento",
  AuthController.authMiddleware,
  CaiController.saveTipoFactura,
);
router.post(
  "/getTipoDocumentoByCompania/:id",
  AuthController.authMiddleware,
  CaiController.getTipoDocumentoByCompany,
);
router.delete(
  "/deleteTipoDocumentoById/:id",
  AuthController.authMiddleware,
  CaiController.deleteTipoDocumento,
);
router.put(
  "/updateTipoDocumentoById/:id",
  AuthController.authMiddleware,
  CaiController.updateTipoDocumento,
);

module.exports = router;
``;
