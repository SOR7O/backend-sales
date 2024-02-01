const mongoose = require("mongoose");

const EstablecimientoSchema = new mongoose.Schema({
    establecimiento:{
        type: String,
        required:true
      },
      descripcion:{
        type: String,
        required:true
      },
      correlativo:{
        type: String,
        required:true
      },
      idCompania:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:'compania'
      },
      activo: {
        type: Boolean,
        default: true
      }
})

const EstablecimientoModel = new mongoose.model('establecimiento',EstablecimientoSchema);
module.exports = EstablecimientoModel;