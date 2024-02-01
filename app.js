// Import required modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const db= require("./db/db")
const app = express();
const port = 3000; // Change this to your desired port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    db
});
const routeUser= require("./routes/user.routes");
const routeCompania= require("./routes/compania.routes");
const routeProducto= require("./routes/productos.routes");
const routePedido= require("./routes/pedidos.routes");
const routeInventario= require("./routes/inventario.routes");
const routeCai= require("./routes/factura.routes");

// Create an Express app

// Enable CORS for all routes
app.use(cors());
// Middleware
app.use(morgan('dev')); // Logging middleware
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'})); // JSON parsing middleware
app.use(express.urlencoded({limit: '50mb', extended: true }));

// Define routes
app.get('/',(req,res,next)=>{
    res.send("ESTA ES UNA API 😁😁")
})
app.use('/user',routeUser);
app.use('/compania',routeCompania);
app.use('/producto',routeProducto);
app.use('/pedido',routePedido);
app.use('/inventario',routeInventario);
app.use('/cai',routeCai);
// Start the server
 module.exports=app;