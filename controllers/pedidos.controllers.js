const PedidoModel= require("../models/pedidos");

const getPedidos= async(req, res, next)=>{
    try {
        
        await PedidoModel.find({}).then((succ) => { 
            res.status(200).json({ type: "ok", data: succ })
        })
        .catch((err) => { res.send(
            { "res": 204, 
            "data": err.error, 
            "message": "Ha ocurrido un error comunicate con el administrador" })
        });
    } catch (error) {
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })           
    }
}
const getPedidosByCompania= async(req, res, next)=>{
    const {id}=req.params
    try {
        
        await PedidoModel.find({idCompania:id}).then((succ) => { 
            res.status(200).json({ type: "ok", data: succ })
        })
        .catch((err) => { res.send(
            { "res": 204, 
            "data": err.error, 
            "message": "Ha ocurrido un error comunicate con el administrador" })
        });
    } catch (error) {
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })           
    }
}
const getPedidosByUser= async(req, res, next)=>{
    const {id}=req.body
    try {
        console.log(id);
        await PedidoModel.find({idUsuario:id}).populate(['idProductos','idUsuario']).then((succ) => { 
            res.status(200).json({ type: "ok", data: succ })
        })
        .catch((err) => { res.status(400).json(
            { 
                "res": 204, 
            "data": err, 
            "message": "Ha ocurrido un error comunicate con el administrador" })
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })           
    }
}

const createPedido= async(req, res, next)=>{
    const {idProducto,idUsuario,cantidad,subtotal,total,impuesto} = req.body;
    console.log(req.body)
    try {
        const createPedid=new PedidoModel({
            idProducto:idProducto,
            idUsuario:idUsuario,
            cantidad:cantidad,
            impuesto:impuesto,
            subtotal:subtotal,
            total:total});
            await PedidoModel.insertMany(req.body)
            .then((succ) => {
                res.status(202).json({ type: "ok", data:succ })
            }
            ).catch((err) => { res.status(204).json({ "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });
            // await createPedid.save()
    } catch (err) {
        res.status(400).json({ "type": "fail", "error": err, message: "Ha ocurrido un error comunicate con el administrador" })
    }
}

const updatePedido = async ( req, res, next)=>{
    let {id} = req.params;
const {idProducto,idUsuario,cantidad,subtotal,total,confirmado} = req.body;
    try {
        const updatePedidoA=({
            idProducto:idProducto,
            idUsuario:idUsuario,
            cantidad:cantidad,
            subtotal:subtotal,
            confirmado:confirmado,
            total:total});
        
    await PedidoModel.findByIdAndUpdate({_id:id}, updatePedidoA).then((success) => {
            res.status(202).json({ type: "ok", data: success })
        }).catch((err) => {
            res.status(204).json({ type: "ok", message: "Ha ocurrido un error, comunicate con el administrador", error: err })
        })
    }
    catch (err) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const deletePedido = async (req, res, next)=>{
    const { _id } = req.body
    try {
        
        await PedidoModel.findOneAndDelete({ _id: id }).then((succ) => {
            res.status(200).json({ type: "ok", message: "Eliminado correctamente", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))
    } catch (error) {
                res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}


module.exports= {
    getPedidos,
    createPedido,
    updatePedido,
    deletePedido,
    getPedidosByCompania,
    getPedidosByUser
}