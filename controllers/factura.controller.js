const FacturaModel = require("../models/factura");
const FacturaDetalleModel = require("../models/facture_detalle");
const CompaniaModel = require("../models/compania");
const createFactura = async (req, res, next) => {
  try {
    const { idCompania, idUser, detalle, headerFactura } = req.body;
    let _detalle = detalle["data"];
    let correlativoNumeroFactura = headerFactura["numeroInicial"];
    let splitCorr = correlativoNumeroFactura.split("-");
    let init = parseInt(splitCorr[3]);
    let facturaHeader = {
      pedidoId: detalle["pedido"]["_id"],
      clienteid: detalle["pedido"]["idUsuario"]["_id"],
      companiaid: idCompania,
      total: detalle["pedido"]["total"].toFixed(2),
      cai: headerFactura["numeroAutorizacion"],
      rtn: "",
      numInifactura: "",
      numeroEndFactura: splitCorr.slice(4, 8).join("-"),
      subtotal: detalle["pedido"]["subtotal"].toFixed(2),
      impuesto: detalle["pedido"]["impuesto"].toFixed(2),
      ultimaFactura: "",
      caiId: headerFactura["_id"],
    };
    var mysort = { ultimaFactura: -1 };
    let companyData = await CompaniaModel.findById(idCompania);
    facturaHeader["rtn"] = companyData["rtn"];

    let fac = await FacturaModel.find({ caiId: headerFactura["_id"] }).sort(
      mysort,
    );

    let ultimaFactura = fac.length == 0 ? init : fac[0]["ultimaFactura"] + 1;
    facturaHeader["ultimaFactura"] = ultimaFactura;
    let after = "";
    for (let i = 0; i < 8 - ultimaFactura.toString().length; i++) {
      after += "0";
    }
    splitCorr[3] = after + ultimaFactura;
    facturaHeader["numInifactura"] = splitCorr.slice(0, 4).join("-");
    await FacturaModel.create(facturaHeader).then(async (succ) => {
      for (var i = 0; i < _detalle.length; i++) {
        _detalle[i]["factura_id"] = succ["_id"];
        _detalle[i]["producto_id"] = _detalle[i]["idProducto"]["_id"];
      }
      await FacturaDetalleModel.insertMany(_detalle).then((saved) => {
        res.status(200).json({
          type: "ok",
          message: "Saved factura",
          data: {
            header: facturaHeader,
            detalle: _detalle,
          },
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: "error",
      message: "ha ocurrido un error comunicate con el administrador",
    });
  }
};

const getFacturasByCompania = async (req, res, next) => {
  console.log("here");
  try {
    const { id } = req.params;

    let data = await FacturaModel.find({ companiaid: id }).populate([
      "clienteid",
    ]);

    if (data.length <= 0) {
      res.status(200).json({ type: "ok", data: "Empty" });
      return;
    }
    let _facturas = [];
    console.log("init");
    for await (const fac of data) {
      let _detalle = await FacturaDetalleModel.find({ factura_id: fac["_id"] });

      _facturas.push({
        header: fac,
        detalle: _detalle,
      });
      console.log(fac);
    }
    console.log(_facturas);
    res.status(200).json({ type: "ok", data: _facturas });
    // let data2= await
  } catch (error) {
    res.status(400).json({
      type: "error",
      error: "Ha ocurrido un error, comunicate con el administrador",
    });
  }
};

const deleteFacturaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await FacturaModel.findByIdAndDelete(id);
    await FacturaDetalleModel.deleteOne({ facturaId: id });
    res.status(200).json({ type: "ok", data: "Eliminado correctamente" });
  } catch (error) {
    res.status(400).json({
      type: "error",
      error: "Ha ocurrido un error, comunicate con el administrador",
    });
  }
};

module.exports = {
  createFactura,
  getFacturasByCompania,
  deleteFacturaById,
};
