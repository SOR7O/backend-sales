

const mongoose = require('mongoose');

const facturaDetalleSchema = new mongoose.Schema({
    factura_id: { type: mongoose.Types.ObjectId, required: true ,ref:'factura'},
    producto_id: { type: mongoose.Types.ObjectId, required: true ,ref:'productos'},
    subtotal: { type: mongoose.Types.Decimal128, required: true },
    cantidad: { type: Number, required: true },
    impuesto: { type: mongoose.Types.Decimal128, required: true },
    total: { type: mongoose.Types.Decimal128, required: true },
}, {
    timestamps: true,
})


const FacturaDetalleModel = mongoose.model('facturaDetalle', facturaDetalleSchema);
module.exports = FacturaDetalleModel;