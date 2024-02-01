const express = require("express");
const router= express.Router();
const CaiController = require("../controllers/cai.controller");


router.post("/getCai",CaiController.getCaiByCompania)
router.post("/saveCai",CaiController.saveCai)
router.post("/saveTipoFact",CaiController.saveTipoFactura)
router.post("/updateCai",CaiController.saveCai)
router.post("/deleteCai",CaiController.saveCai)

module.exports= router;``