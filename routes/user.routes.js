const express= require("express");
const routes = express.Router();
const users= require("../controllers/users")

// ruta para crud de usuarios
routes.get("/getUser", users.getUser);
routes.post("/getUserByCompania", users.getUser);

routes.post("/createUser", users.createUser);
routes.post("/login", users.login);

routes.post("/updateUser", users.updateUser);
routes.post("/deleteUser", users.deleteUser);

//ruta para crear roles
routes.post("/addRole",users.createRoles);
routes.get("/getRole",users.getRoles);
routes.post("/updateRole",users.updateRole);
routes.post("/deleteRole",users.deleteRole);
module.exports= routes;