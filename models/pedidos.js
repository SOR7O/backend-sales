const mongoose = require("mongoose");




const pedidoSchema = new mongoose.Schema({
    idProducto: { type: mongoose.Types.ObjectId, required: true, ref:'productos' },
    idUsuario: { type: mongoose.Types.ObjectId, required: true ,ref:'users'},
    cantidad: { type: Number, required: true },
    subtotal: { type: mongoose.Types.Decimal128, required: true },
    total: { type: mongoose.Types.Decimal128, required: true },
    impuesto: { type: mongoose.Types.Decimal128, required: true },
    confirmado: {
        type: Boolean,
        required: false,
        default: false
    }
})

const PedidoModel = mongoose.model("pedidos", pedidoSchema);

module.exports = PedidoModel;
