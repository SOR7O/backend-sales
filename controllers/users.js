require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/users");
const RoleModel = require("../models/roles");
const CompaniaModel = require('../models/compania');


const getUser = async (req, res, next) => {
    try {

        await UserModel.find({}).then((users) => {
            res.status(200).json({ "type": "ok", data: users });
        })

    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}
const createUser = async (req, res, next) => {
    // 

    const { nombre, telefono, direccion, correo, username, password, idCompania, role } = req.body;
    try {

        const rol = await RoleModel.find({ "nombre": { $in: role } });
        const typeUser = role == 'Administrador' ? 2 : role == 'super' ? 1 : 3;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const findCompany = await CompaniaModel.findById(idCompania)
        const createUser = new UserModel({
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            correo: correo,
            username: username,
            password: hashedPassword,
            typeUser: typeUser,
            idCompania: findCompany['_id'],
            role: rol.map((rol) => rol._id)
        })

        const findUser = await UserModel.find({ username: username })

        if (findUser.length === 0) {
            await createUser.save().then((succ) => {
                res.status(202).json({ type: "ok", data: createUser })
            }
            ).catch((err) => { res.send({ "res": 200, "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });
        } else {

            res.send({ "res": 200, "message": "El usuario ya existe" })
        }
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const updateUser = async (req, res, next) => {

    var { id, nombre, telefono, direccion, correos, username, password, idCompania, role } = req.body;
    try {

        const newpass = password;
        const rol = await RoleModel.find({ "nombre": { $in: role } });
        const typeUser = role.toLowerCase() == 'administrador' ? 2 : role == 'super' ? 1 : 3;
        const findRol = rol.map((rol) => rol._id)
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(newpass, salt);

        await UserModel.findByIdAndUpdate(id, { nombre, telefono, correo, direccion, typeUser, username, password, idCompania, findRol }, { new: true }).then((succ) => {

            res.status(200).json(succ)
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error", error: err }))
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const deleteUser = async (req, res, next) => {

    const { _id } = req.body
    try {
        await UserModel.findOneAndDelete({ _id: id }).then((succ) => {
            res.status(200).json({ type: "ok", message: "Eliminado correctamente", data: succ })
        }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))

    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

//login
const login = async (req, res, next) => {

    const { password, username } = req.body;

    try {

        if (!password || !username) return res.status(200).json({ message: 'Campos vacios' });
        const user = await UserModel.findOne({ username: req.body.username });
        
        if (!user) return res.status(200).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(200).json({ message: 'Contraseña incorrecta' });
        const token = await jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: 84600 });
        res.status(200).json({ message: 'Logged in', token: token ,idUser:user._id,idCompania:user.idCompania,typeUser:user.typeUser});
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

// api add roles
const createRoles = async (req, res, next) => {
    const { role } = req.body;
    try {

        if (!role) return res.status(200).json({ "message": "Campos vacios" });
        const createRole = await RoleModel({
            nombre: role
        });
        await createRole.save().then((success) => {
            res.status(200).json({ "message": "Creado exitosamente" })
        })
    } catch (error) {
        res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
    }
}

const getRoles = async (req, res, next) => {
    try {
        await RoleModel.find().then((success) => {
            res.status(200).json({ type: "ok", data: success })
        })
    } catch (error) {
        res.status(204).json({ type: "error", message: "Ha ocurrido un error, comunicate con el administrador." })
    }
}

const updateRole = async (req, res, next) => {
    const { role, _id } = req.body;
    try {
        await RoleModel.findByIdAndUpdate(_id, { nombre: role }).then((success) => {
            res.status(200).json({ type: "ok", data: success })
        });
    } catch (error) {
        res.status(204).json({ type: "error", message: "Ha ocurrido un error, comunicate con el administrador." })
    }
}
const deleteRole = async (req, res, next) => {
    const {  _id } = req.body;
    try {
        await RoleModel.findByIdAndDelete(_id).then((success) => {
            res.status(200).json({ type: "ok", data: success })
        });
    } catch (error) {
        res.status(204).json({ type: "error", message: "Ha ocurrido un error, comunicate con el administrador." })
    }
}




module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    createRoles,
    getRoles,
    updateRole,
    deleteRole
}