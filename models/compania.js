const mongoose = require('mongoose');

const companiaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    logo: {
        data: Buffer,
        contentType: String
    },
    fecha: { type: Date, default: Date.now() },
    nombrePropietario: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    correo: { type: String, required: true },
    is_activated: {
        type: Boolean,
        required: false,
        default: false,
    },
    rtn:{type:String, required:true}
}, {
    timestamps: true,
})


const CompaniaModel = mongoose.model('compania', companiaSchema);
module.exports = CompaniaModel;
