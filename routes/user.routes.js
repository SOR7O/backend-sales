const express= require("express");
const routes = express.Router();
const users= require("../controllers/users")

// ruta para crud de usuarios
routes.get("/getUser", users.getUser);

routes.post("/createUser", users.createUser);
routes.post("/login", users.login);

routes.post("/updateUser", users.updateUser);
routes.post("/deleteUser", users.deleteUser);

//ruta para crear roles
routes.post("/addRole",users.roles);
module.exports= routes;