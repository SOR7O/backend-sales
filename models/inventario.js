const mongoose = require("mongoose");

const inventarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    unidadMedida: { type: String, required: true },
    cantidadUtilizada: { type: mongoose.Types.Decimal128, required: true },
    stock: { type: mongoose.Types.Decimal128, required: true },
    fecha: { type: Date, default: Date.now() },

},
    {
        timestamps: true,
    });

const inventarioModel = inventarioSchema.model("inventario", inventarioSchema);

module.exports = inventarioModel;