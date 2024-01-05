const mongoose= require("mongoose");


const pedidoSchema= new mongoose.Schema({
    idProducto:{type:mongoose.Types.ObjectId, required:true},
    idCompania:{type:mongoose.Types.ObjectId, required:true},
    idUsuario:{type:mongoose.Types.ObjectId, required:true},
    cantidad:{type:Number, required:true},
    subtotal:{types:mongoose.Types.Decimal128, required:true},
    total:{types:mongoose.Types.Decimal128, required:true}
})

const PedidoModel= mongoose.model("pedidos",pedidoSchema);

module.exports= PedidoModel;