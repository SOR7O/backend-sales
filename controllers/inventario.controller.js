const InventarioModel = require("../models/inventario");

const getInventario = async (req, res, next) => {
    try {

        await InventarioModel.find({}).then((inv) => {
            res.status(200).json({ "type": "ok", data: inv });
        })
    } catch (error) {
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const createInventario = async (req, res, next) => {
    const { nombre, descripcion, unidadMedida, cantidadUtilizada, stock, idCompania, idUser } = req.body;
    try {

        const createInventario = new InventarioModel({
            nombre: nombre,
            descripcion: descripcion,
            unidaMedida: unidadMedida,
            cantidadUtilizada: cantidadUtilizada,
            stock: stock,
            idCompania: idCompania,
            idUser: idUser
        });
        await createInventario.save().then((succ) => {
            res.status(202).json({ type: "ok", data: succ })
        }
        ).catch((err) => { res.send({ "res": 200, "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });
    } catch (error) {
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const deleteInventario = async (req, res, next) => {
    const { _id } = req.body
    try {

        await InventarioModel.findOneAndDelete({ _id: id }).then((succ) => {
            res.status(200).json({ type: "ok", message: "Eliminado correctamente", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))

    } catch (error) {
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const updateInventario = async (req, res, next) => {
    const { _id } = req.body
    const { nombre, descripcion, unidadMedida, cantidadUtilizada, stock, idCompania, idUser } = req.body;
    try {

        const updateInventory = ({
            nombre: nombre,
            descripcion: descripcion,
            unidaMedida: unidadMedida,
            cantidadUtilizada: cantidadUtilizada,
            stock: stock,
            idCompania: idCompania,
            idUser: idUser
        });

        await InventarioModel.findByIdAndUpdate({_id:id}, updateInventory, { new: true }).then((succ) => {

            res.status(200).json({ type: "ok", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error", error: err }))

    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const getinventarioByCompania = async (req, res, next)=>{
    const {id}= req.params;

    try {
        await InventarioModel.find({idCompania:id}).then((inv) => {
            res.status(200).json({ "type": "ok", data: inv });
        })
        
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const getinventarioByUser = async (req, res, next)=>{
    const {id}= req.params;

    try {
        await InventarioModel.find({idUser:id}).then((inv) => {
            res.status(200).json({ "type": "ok", data: inv });
        })
        
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

module.exports = {
    getInventario, createInventario, updateInventario, deleteInventario,getinventarioByCompania,getinventarioByUser
}