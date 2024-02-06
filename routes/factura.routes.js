const express = require("express");
const router= express.Router();
const CaiController = require("../controllers/cai.controller");


router.post("/getCaiByCompania/:id",CaiController.getCaiByCompania)
router.post("/createCai",CaiController.saveCai)
router.post("/saveTipoFact",CaiController.saveTipoFactura)
router.put("/updateCaiById/:id",CaiController.updateCai)
router.delete("/deleteCaiById/:id",CaiController.deleteCai)

//rutas punto emision
router.post("/createPuntoEmision",CaiController.savePuntoEmision)
router.post("/getPuntosEmisionByCompania/:id",CaiController.getPuntosEmisionByCompany)
router.delete('/deletePuntoEmisionById/:id',CaiController.deletePuntoEmision)
router.put('/updatePuntoEmisionById/:id',CaiController.updatePuntoEmision)

//rutas establecimiento
router.post("/createEstablecimiento",CaiController.saveEstablecimiento)
router.post("/getEstablecimientoByCompania/:id",CaiController.getEstablecimientoByCompany)
router.delete('/deleteEstablecimientoById/:id',CaiController.deleteEstablecimiento)
router.put('/updateEstablecimientoById/:id',CaiController.updateEstablecimiento)

//rutas Tipos de documentos
router.post("/createTipoDocumento",CaiController.saveTipoFactura)
router.post("/getTipoDocumentoByCompania/:id",CaiController.getTipoDocumentoByCompany)
router.delete('/deleteTipoDocumentoById/:id',CaiController.deleteTipoDocumento)
router.put('/updateTipoDocumentoById/:id',CaiController.updateTipoDocumento)

module.exports= router;``