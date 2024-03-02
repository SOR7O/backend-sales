const express = require("express");
const router = express.Router();
const PedidosController = require("../controllers/pedidos.controllers");

//REQUERIMOS EL MIDDLEWARE PARA ACCESSO
const AuthController = require("../middleware/authenticate");
//RUTAS DE CRUD DE Invenarios
router.get(
  "/getPedidos",
  AuthController.authMiddleware,
  PedidosController.getPedidos,
);
router.post(
  "/getPedidosByCompania",
  AuthController.authMiddleware,
  PedidosController.getPedidosByCompania,
);
router.post(
  "/getPedidosByUser",
  AuthController.authMiddleware,
  PedidosController.getPedidosByUser,
);
router.post(
  "/addPedido",
  AuthController.authMiddleware,
  PedidosController.createPedido,
);
router.post(
  "/updatePedido",
  AuthController.authMiddleware,
  PedidosController.updatePedido,
);
router.post(
  "/updatePedidoEstado",
  AuthController.authMiddleware,
  PedidosController.confirmarPedido,
);
router.post(
  "/deletePedido",
  AuthController.authMiddleware,
  PedidosController.deletePedido,
);

module.exports = router;
