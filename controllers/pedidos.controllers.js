const PedidoModel = require("../models/pedidos");
const mongoose = require("mongoose")

const getPedidos = async (req, res, next) => {
    try {

        await PedidoModel.PedidoModelfind({}).then((succ) => {
            res.status(200).json({ type: "ok", data: succ })
        })
            .catch((err) => {
                res.send(
                    {
                        "res": 204,
                        "data": err.error,
                        "message": "Ha ocurrido un error comunicate con el administrador"
                    })
            });
    } catch (error) {
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const getPedidosByCompania = async (req, res, next) => {
    const { id } = req.body
    try {
        let data = [];
        await PedidoModel.PedidoModel.find({ idCompania: id }).populate(['idUsuario', 'idCompania']).then(async (_data) => {
            for (const item of _data) {
                const orderDetail = await PedidoModel.DetallePedidoModel.find({ "idPedido": item['_id'] }).populate(["idProducto"])

                data.push({ "pedido": item, "detalle": orderDetail })
            }
        })
        res.status(200).json({ "type": "ok", data: data })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const getPedidosByUser = async (req, res, next) => {
    const { id } = req.body
    try {
        let data = [];
        await PedidoModel.PedidoModel.find({ "idUsuario": id }).populate(['idUsuario', 'idCompania']).then(async (_data) => {
            for (const item of _data) {
                const orderDetail = await PedidoModel.DetallePedidoModel.find({ "idPedido": item['_id'] }).populate(["idProducto"])

                data.push({ "pedido": item, "detalle": orderDetail })
            }
        })


        res.status(200).json({ "type": "ok", data: data })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const createPedido = async (req, res, next) => {
    const { idCompania, idUsuario, data } = req.body;

    try {

        const createPedido = new PedidoModel.PedidoModel({
            idUsuario: idUsuario,
            idCompania: idCompania
        })


        await createPedido.save().then(async (add) => {
            for (let d = 0; d < data.length; d++) {
                data[d]['idPedido'] = add['_id']
            }
            console.log("add");
            console.log(add);
            await PedidoModel.DetallePedidoModel.insertMany(data)
                .then((succ) => {
                    res.status(202).json({ type: "ok", data: succ })
                }
                ).catch((err) => {
                    res.status(204).json({
                        "data": err.error,
                        "message": "Ha ocurrido un error comunicate con el administrador"
                    })
                });
        }).catch((err) => {
            console.log(err);
            res.status(400).json({
                "type": "error",
                "message": "Ha ocurrido un error comunicate con el administrador."
            })
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({ "type": "fail", "error": err, message: "Ha ocurrido un error comunicate con el administrador" })
    }
}

const updatePedido = async (req, res, next) => {
    let { id } = req.params;
    const { idProducto, idUsuario, cantidad, subtotal, total, confirmado } = req.body;
    try {
        const updatePedidoA = ({
            idProducto: idProducto,
            idUsuario: idUsuario,
            cantidad: cantidad,
            subtotal: subtotal,
            confirmado: confirmado,
            total: total
        });

        await PedidoModel.PedidoModelfindByIdAndUpdate({ _id: id }, updatePedidoA).then((success) => {
            res.status(202).json({ type: "ok", data: success })
        }).catch((err) => {
            res.status(204).json({ type: "ok", message: "Ha ocurrido un error, comunicate con el administrador", error: err })
        })
    }
    catch (err) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const deletePedido = async (req, res, next) => {
    const { _id } = req.body
    try {

        await PedidoModel.PedidoModelfindOneAndDelete({ _id: id }).then((succ) => {
            res.status(200).json({ type: "ok", message: "Eliminado correctamente", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const confirmarPedido = async (req, res, next) => {
    const { _id, confirmado } = req.body;

    try {
        await PedidoModel.DetallePedidoModel.findByIdAndUpdate(_id, { confirmado: confirmado }).then((succ) => {
            res.status(200).json({ type: "ok", message: "Actualizado correctamente", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))
    } catch (error) {
        console.log(error);
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}


module.exports = {
    getPedidos,
    createPedido,
    updatePedido,
    deletePedido,
    getPedidosByCompania,
    getPedidosByUser,
    confirmarPedido
}