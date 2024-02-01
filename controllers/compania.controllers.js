const CompaniaModel = require('../models/compania');


const getCompania = async(req, res, next) => {
    await CompaniaModel.find({}).then((compa) => {
        res.status(200).json({ "type": "ok", data: compa });
    })
}
const createCompania = async (req, res, next) => {
    const { nombre, telefono, direccion, correo, logo, nombrePropietario } = req.body;
    try {

        const createCompania = new CompaniaModel({
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            logo: logo,
            nombrePropietario: nombrePropietario,
        })


        await createCompania.save().then((succ) => { res.status(200).json({ type: "ok", data: createCompania }) })
            .catch((err) => { res.send({ "res": 204, "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const updateCompania = async (req, res, next) => {

    const { nombre, telefono, direccion, correo, logo, nombrePropietario ,_id,is_activated} = req.body;
    
    try {

        const updateCompania = ({
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            logo: logo,
            nombrePropietario: nombrePropietario,
            is_activated:is_activated
        })

        await CompaniaModel.findByIdAndUpdate({_id:_id}, updateCompania ).then((success) => {
            res.status(202).json({ type: "ok"})
        }).catch((err) => {
            
            res.status(204).json({ type: "ok", message: "Ha ocurrido un error, comunicate con el administrador", error: err })
        })
    } catch (error) {
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }

}
const deleteCompania = async (req, res, next) => {
    const { _id } = req.body;

    try {

        await CompaniaModel.findOneAndDelete({ _id: _id }).then((succ) => {
            res.status(200).json({ type: "ok", message: "Eliminado correctamente", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))
    } catch (error) {
        
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

module.exports = { getCompania, createCompania, updateCompania, deleteCompania };