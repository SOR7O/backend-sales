const FacturaModel = require("../models/factura");
const FacturaDetalleModel = require("../models/facture_detalle");

const createPuntoEmisionc = async (req, res, next)=> {
    console.log(req.body);
    res.send("Dontsave")
}