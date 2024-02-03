const mongoose = require("mongoose");

const ImpuestoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correlativo: { type: String, required: true },
  valor: { type: Number, required: true }
});

const ImpuestoModel = mongoose.model("impuesto", ImpuestoSchema);
module.exports = ImpuestoModel;
