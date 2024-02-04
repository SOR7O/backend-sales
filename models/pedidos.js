const mongoose = require("mongoose");



const PedidoSchema = new mongoose.Schema({
    idUsuario:{ type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    idCompania:{ type: mongoose.Types.ObjectId, required: true, ref: 'compania' },
    fecha: { type: Date, default: Date.now() },
}, {
    timestamps: true,
})
const DetallePedidoSchema = new mongoose.Schema({
    idProducto: { type: mongoose.Types.ObjectId, required: true, ref: 'productos' },
    idPedido: { type: mongoose.Types.ObjectId, required: true, ref: 'pedidos' },
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

const PedidoModel = mongoose.model("pedidos", PedidoSchema);
const DetallePedidoModel = mongoose.model("detallepedidos", DetallePedidoSchema);

module.exports = {PedidoModel,DetallePedidoModel};
