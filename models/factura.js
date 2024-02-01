
const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
    clienteid: { type: mongoose.Types.ObjectId, required: true,ref:'users' },
    companiaid: { type: mongoose.Types.ObjectId, required: true,ref:'compania' },
    fecha: { type: Date, default: Date.now() },
    total: { type: mongoose.Types.Decimal128, required: true },
    cai: { type: String, required: true },
    rtn: { type: String, required: true },
    numfactura: { type: String, required: true },
    numeroFactura: { type: String, required: true },
}, {
    timestamps: true,
})


const FacturaModel = mongoose.model('factura', facturaSchema);
module.exports = FacturaModel;