const mongoose = require("mongoose");

const InventarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now() },
    idCompania: { type: mongoose.Types.ObjectId, required: true, ref: 'compania' },
    idUsuario: { type: mongoose.Types.ObjectId, required: true, ref: 'users' }
},
    {
        timestamps: true,
    });

const InventadioDetalleSchema = new mongoose.Schema({
    idInventario: { type: mongoose.Types.ObjectId, required: true, ref: 'inventario' },
    stock: { type: mongoose.Types.Decimal128, required: true },
    productoId: { type: mongoose.Types.ObjectId, required: true, ref: 'productos' },
    typeInventario: { type: String, required: true }
}, {
    timestamps: true,
})

const entradaInventarioSchema = new mongoose.Schema({
    idInventarioDetalle: { type: mongoose.Types.ObjectId, required: true, ref: 'inventarioDetalle' },
    fecha: { type: Date, default: Date.now() },
    cantidad: { type: mongoose.Types.Decimal128, required: true }
})
const salidaInventarioSchema = new mongoose.Schema({
    productoId: { type: mongoose.Types.ObjectId, required: true, ref: 'productos' },
    fecha: { type: Date, default: Date.now() },
    idUsuario: { type: mongoose.Types.ObjectId, required: true, ref: 'users' },
    cantidad: { type: mongoose.Types.Decimal128, required: true },
})
const InventarioModel = mongoose.model("inventario", InventarioSchema);
const InventarioDetalleModel = mongoose.model("inventarioDetalle", InventadioDetalleSchema);
const InventarioDetalleEntradaModel = mongoose.model("entradaInventarioDetalle", entradaInventarioSchema);
const InventarioDetalleSalidaModel = mongoose.model("salidaInventarioDetalle", salidaInventarioSchema);

module.exports = { InventarioModel, InventarioDetalleModel, InventarioDetalleEntradaModel, InventarioDetalleSalidaModel };