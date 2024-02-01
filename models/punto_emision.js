const mongoose = require("mongoose");

const PuntoEmisionSchema = new mongoose.Schema({
  puntoEmision: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  correlativo: {
    type: String,
    required: true,
  },
  idCompania: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "companias",
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

const PuntoEmisionModel = mongoose.model("puntoEmision", PuntoEmisionSchema);
module.exports = PuntoEmisionModel;
