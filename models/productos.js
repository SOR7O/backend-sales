const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    disponible: {
        type: Boolean,
        required: true,
        default: true,
    },
    idCompania: { type: mongoose.Types.ObjectId, required: true , ref:'compania'},
    idUser: { type: mongoose.Types.ObjectId, required: true , ref:'users'},
    imagen: {
        type:String
    },
    precio: {type:mongoose.Types.Decimal128, required:true}
});

const ProductoModel = mongoose.model("productos", productoSchema);
module.exports = ProductoModel;
