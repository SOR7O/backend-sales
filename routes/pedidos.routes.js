const express = require("express");
const router= express.Router();
const Pedidos= require("../controllers/pedidos.controllers");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE Invenarios
router.get('/getPedidos',authenticate.authMiddleware,Pedidos.getPedidos);
router.get('/getPedidosByCompania/:id',authenticate.authMiddleware,Pedidos.getPedidosByCompania);
router.get('/getPedidosByUser/:id',authenticate.authMiddleware,Pedidos.getPedidosByUser);
router.post('/addPedido',Pedidos.createPedido);
router.post('/updatePedido/:id',Pedidos.updatePedido);
router.post('/deletePedido/:id',Pedidos.deletePedido);

module.exports= router;