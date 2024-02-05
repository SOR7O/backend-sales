const express = require("express");
const router= express.Router();
const CaiController = require("../controllers/cai.controller");


router.post("/getCai",CaiController.getCaiByCompania)
router.post("/saveCai",CaiController.saveCai)
router.post("/saveTipoFact",CaiController.saveTipoFactura)
router.post("/updateCai",CaiController.saveCai)
router.post("/deleteCai",CaiController.saveCai)

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