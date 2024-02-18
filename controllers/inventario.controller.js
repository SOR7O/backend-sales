const { InventarioModel, InventarioDetalleSalidaModel, InventarioDetalleEntradaModel, InventarioDetalleModel } = require("../models/inventario");

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
    try {
        const { nombre, descripcion, cantidad, prods, idCompania, idUser, typeInventario, productoId } = req.body;

        console.log(req.body);



        // res.send("TODO OK")
        const createInventario = new InventarioModel({
            nombre: nombre,
            descripcion: descripcion,
            idCompania: idCompania,
            idUsuario: idUser
        });


        // const createInventario = new InventarioModel({
        //     nombre: nombre,
        //     descripcion: descripcion,
        //     cantidad: cantidad,
        //     stock: stock,
        //     idCompania: idCompania,
        //     idUser: idUser
        // });
        await createInventario.save().then(async (succ) => {
            console.log(succ);
            console.log(succ);
            let invDetalle = [];
            for (let index = 0; index < prods.length; index++) {
                let _invDetalle = {
                    idInventario: succ['_id'],
                    stock: prods[index]['cantidad'],
                    productoId: prods[index]['idProducto'],
                    typeInventario: typeInventario
                }
                invDetalle.push(_invDetalle)

            }
            console.log("detalle::::::::", invDetalle);
            await InventarioDetalleModel.insertMany(invDetalle).then(async(saved) => {
                let invEntrada=[];
                for (let i = 0; i < saved.length; i++) {
                    let _invEntrada={
                        idInventarioDetalle: saved[i]['_id'],
                        cantidad:saved[i]['stock']
                    }
                    invEntrada.push(_invEntrada)
                }

                await InventarioDetalleEntradaModel.insertMany(invEntrada);
                res.status(200).json({ type: "ok", data: { header: succ, body: saved }, })
            }).catch((err) => {
                console.log("thiiis errrorr", err);
                res.status(400).json({"data": err, "message": "2-Ha ocurrido un error comunicate con el administrador" }) });
                
                
            }
            ).catch((err) => { res.send({ "res": 400, "data": err.error, "message": "1-Ha ocurrido un error comunicate con el administrador" }) });
        } catch (error) {
        console.log("thiiis errrorr end catch", error);
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

        await InventarioModel.findByIdAndUpdate({ _id: id }, updateInventory, { new: true }).then((succ) => {

            res.status(200).json({ type: "ok", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error", error: err }))

    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const getinventarioByCompania = async (req, res, next) => {
    const { id } = req.params;

    try {
        await InventarioModel.find({ idCompania: id }).then((inv) => {
            res.status(200).json({ "type": "ok", data: inv });
        })

    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const getinventarioByUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        await InventarioModel.find({ idUser: id }).then((inv) => {
            res.status(200).json({ "type": "ok", data: inv });
        })

    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

module.exports = {
    getInventario, createInventario, updateInventario, deleteInventario, getinventarioByCompania, getinventarioByUser
}