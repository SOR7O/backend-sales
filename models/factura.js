const mongoose = require("mongoose");

const facturaSchema = new mongoose.Schema(
  {
    clienteid: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    pedidoId: { type: mongoose.Types.ObjectId, required: true, ref: "pedidos" },
    companiaid: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "compania",
    },
    fecha: { type: Date, default: Date.now() },
    total: { type: mongoose.Types.Decimal128, required: true },
    cai: { type: String, required: true },
    rtn: { type: String, required: true },
    numInifactura: { type: String, required: true },
    numeroEndFactura: { type: String, required: true },
    subtotal: { type: mongoose.Types.Decimal128, required: true },
    impuesto: { type: mongoose.Types.Decimal128, required: true },
    ultimaFactura: { type: Number, required: true },
    caiId: { type: mongoose.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

const FacturaModel = mongoose.model("factura", facturaSchema);
module.exports = FacturaModel;
