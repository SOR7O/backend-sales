const mongoose = require("mongoose");

const inventarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    unidadMedida: { type: String, required: true },
    cantidadUtilizada: { type: mongoose.Types.Decimal128, required: true },
    stock: { type: mongoose.Types.Decimal128, required: true },
    fecha: { type: Date, default: Date.now() },
    idCompania:{type:mongoose.Types.ObjectId,required:true, ref:'compania'},
    idUsuario:{type:mongoose.Types.ObjectId, required:true, ref:'users'}

},
    {
        timestamps: true,
    });

const inventarioModel = mongoose.model("inventario", inventarioSchema);

module.exports = inventarioModel;