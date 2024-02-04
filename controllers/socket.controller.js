const io = global.io;


const ioController = (socket) => {
    socket.on("desdeFrontend", (valor) => {
        io.emit("pedidoAgregado", valor)
        console.log("send peticion from frontend");
        console.log(valor);

    })

    socket.on("confirmarPedido", (pedido) => {
        console.log("pedido confirmed");
        io.emit("Pedidoconfirmado", 1)
    })
}

module.exports = ioController;