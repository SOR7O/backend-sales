const CompaniaModel = require('../models/compania');


const getCompania = (req, res, next) => {
    CompaniaModel.find({}).then((compa) => {
        res.status(200).json({ "type": "ok", data: compa });
    })
}
const createCompania = async (req, res, next) => {
    const { nombre, telefono, direccion, correo, logo, nombrePropietario } = req.body;
    const createCompania = new CompaniaModel({
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        logo: logo,
        nombrePropietario: nombrePropietario,
    })


    await createCompania.save().then((succ) => { res.status(201).json(createCompania)})
        .catch((err) => { res.send({ "res": 204, "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });
}
const updateCompania = (req, res, next) => { }
const deleteCompania = (req, res, next) => { }

module.exports = { getCompania, createCompania, updateCompania, deleteCompania };