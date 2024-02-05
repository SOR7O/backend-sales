// Import required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./db/db")
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: true,
    origins: ["*"]
});
global.io=io;
const iocontroller= require("./controllers/socket.controller")
const PORT = 3000; // Change this to your desired port

io.on("connection", (socket) => {
    console.log("se ha conectado");
    io.emit("connected","Te haz conectado mi perro")
    // socket.on("desdeFrontend", (valor)=>{
    //     io.emit("pedidoAgregado", valor)
    //     console.log("send peticion from frontend");
    //     console.log(valor);

    // })
    socket.on("confirmarPedido", (pedido) => {
        console.log("pedido confirmed");
        io.emit("Pedidoconfirmado", 1)
    })
    iocontroller(socket);
    //     io.on("desdeFrontend", (valor)=>{
    
    //     console.log("send peticion from frontend");
    //     console.log(valor);
    // })
})

httpServer.listen(PORT, () => console.log('Server is running on port ' + PORT));

const routeUser = require("./routes/user.routes");
const routeCompania = require("./routes/compania.routes");
const routeProducto = require("./routes/productos.routes");
const routePedido = require("./routes/pedidos.routes");
const routeInventario = require("./routes/inventario.routes");
const routeCai = require("./routes/factura.routes");
const routeImpuesto = require("./routes/impuesto.routes");


// Create an Express app

// Enable CORS for all routes
app.use(cors());
// Middleware
app.use(morgan('dev')); // Logging middleware
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' })); // JSON parsing middleware
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Define routes
app.get('/', (req, res, next) => {
    res.send("ESTA ES UNA API 😁😁")
})
app.use('/user', routeUser);
app.use('/compania', routeCompania);
app.use('/producto', routeProducto);
app.use('/pedido', routePedido);
app.use('/inventario', routeInventario);
app.use('/facturas', routeCai);
app.use('/impuesto', routeImpuesto);
// Start the server
module.exports = app;