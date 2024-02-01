const mongoose = require("mongoose");

// Conectarse a la base de datos

// Definir un esquema para el CAI (Certificado de Acreditación de Impresión)
const tipoFacShema = new mongoose.Schema({
  tipoFactura: {
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

// Crear un modelo basado en el esquema
const TipoFacturaModel = mongoose.model("tipoFactura", tipoFacShema);

module.exports = TipoFacturaModel;
