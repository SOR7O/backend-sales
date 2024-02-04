const express = require("express");
const router= express.Router();
const Pedidos= require("../controllers/pedidos.controllers");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const authenticate= require("../middleware/authenticate")
//RUTAS DE CRUD DE Invenarios
router.get('/getPedidos',authenticate.authMiddleware,Pedidos.getPedidos);
router.post('/getPedidosByCompania',authenticate.authMiddleware,Pedidos.getPedidosByCompania);
router.post('/getPedidosByUser',authenticate.authMiddleware,Pedidos.getPedidosByUser);
router.post('/addPedido',Pedidos.createPedido);
router.post('/updatePedido',Pedidos.updatePedido);
router.post('/updatePedidoEstado',Pedidos.confirmarPedido);
router.post('/deletePedido',Pedidos.deletePedido);

module.exports= router;