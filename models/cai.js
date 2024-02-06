const mongoose = require('mongoose');

// Conectarse a la base de datos

// Definir un esquema para el CAI (Certificado de Acreditación de Impresión)
const caiSchema = new mongoose.Schema({
  numeroAutorizacion: {
    type: String,
    required: true,
    unique: true
  },
  idCompania: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'compania'
  },
  idPuntoEmision: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'puntoEmision'
  },
  idEstablecimiento: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'establecimiento'
  },
  idTipoDocumento: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'tipoFactura'
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  rangoInicial: {
    type: Number,
    required: true
  },
  rangoFinal: {
    type: Number,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  numeroInicial: {
    type: String,
    required: true
  }
});

// Crear un modelo basado en el esquema
const CaiModel = mongoose.model('Cai', caiSchema);

module.exports = CaiModel;