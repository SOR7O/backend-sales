const express = require("express");
const routes = express.Router();
const UsersController = require("../controllers/users");
const AuthController = require("../middleware/authenticate");

// ruta para crud de usuarios
routes.get("/getUser", AuthController.authMiddleware, UsersController.getUser);
routes.post(
  "/getUserByCompania",
  AuthController.authMiddleware,
  UsersController.getUser,
);

routes.post("/createUser", UsersController.createUser);
routes.post("/login", UsersController.login);

routes.post(
  "/updateUser",
  AuthController.authMiddleware,
  UsersController.updateUser,
);
routes.post(
  "/deleteUser",
  AuthController.authMiddleware,
  UsersController.deleteUser,
);

//ruta para crear roles
routes.post(
  "/addRole",
  AuthController.authMiddleware,
  UsersController.createRoles,
);
routes.get("/getRole", AuthController.authMiddleware, UsersController.getRoles);
routes.post(
  "/updateRole",
  AuthController.authMiddleware,
  UsersController.updateRole,
);
routes.post(
  "/deleteRole",
  AuthController.authMiddleware,
  UsersController.deleteRole,
);
module.exports = routes;
