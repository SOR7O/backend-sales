const mongoose = require("mongoose");
const ProductoModel = require("../models/productos");

const getProducto = async (req, res, next) => {
    try {

        // await ProductoModel.find().populate("idCompania").then((succ) => {  }).catch(error => );
        await ProductoModel.find({}).populate(["idCompania", "idUser"]).then((prod) => {
            
            res.status(200).json({ "type": "ok", data: prod });
        })
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })

    }
}
const getProductoByCompania = async (req, res, next) => {


    const { id } = req.body;
    

    try {
        await ProductoModel.find({ idCompania: id }).populate(["idCompania", "idUser"]).then((prod) => {
            
            res.status(200).json({ "type": "ok", data: prod });
        })
    } catch (error) {

        res.status(202).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })

    }
}
const getProductoByUser = async (req, res, next) => {
    const { id } = req.params
    try {
        await ProductoModel.find({ idUser: id }).populate(["idCompania", "idUser"]).then((prod) => {
            res.status(200).json({ "type": "ok", data: prod });
        })
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })

    }
}
const createProducto = async (req, res, next) => {

    const { nombre, descripcion, idCompania, idUser, imagen, precio } = req.body;
    try {
        const createProduct = new ProductoModel({
            nombre: nombre,
            descripcion: descripcion,
            idCompania: idCompania,
            imagen: imagen,
            idUser: idUser,
            precio: precio
        });

        await createProduct.save().then((succ) => {

            res.status(202).json({ type: "ok", data: succ })
        }
        ).catch((err) => {


            return res.status(202).json({ type: "error", "message": "Ha ocurrido un error comunicate con el administrador" })
        });
    } catch (err) {


        res.status(204).json({ "type": "fail", "error": err, message: "Ha ocurrido un error comunicate con el administrador" })
    }
}
const updateProducto = async (req, res, next) => {
    const { nombre, descripcion, idCompania, idUser, imagen, precio, _id } = req.body;
    try {
        const updateProduct = ({
            nombre: nombre,
            descripcion: descripcion,
            idCompania: idCompania,
            imagen: imagen,
            idUser: idUser,
            precio: precio
        });
        await ProductoModel.findByIdAndUpdate({ _id: _id }, updateProduct).then((success) => {
            res.status(202).json({ type: "ok", data: success })
        }).catch((err) => {
            res.status(204).json({ type: "ok", message: "Ha ocurrido un error, comunicate con el administrador", error: err })
        })
    }
    catch (err) {

        return res.status(400).send({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const deleteProducto = async (req, res, next) => {
    const { _id } = req.body
    try {

        await ProductoModel.findOneAndDelete({ _id: _id }).then((succ) => {
            res.status(200).json({ type: "ok", message: "Eliminado correctamente", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}


module.exports = {
    getProducto,
    updateProducto,
    deleteProducto,
    createProducto,
    getProductoByCompania,
    getProductoByUser
}