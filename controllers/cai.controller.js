const CaiModel = require("../models/cai");
const EstablecimientoModel = require("../models/establecimiento");
const PuntoEmisionModel = require("../models/punto_emision");
const TipoFacturaModel = require("../models/tipoFactura");
// const tipoFacturaModel = require("../models/tipoFactura");

const getCaiByCompania = async (req, res, next) => {

    const { _id } = req.body;
    await CaiModel.findById({ _id: _id }).then((succ) => {
        console.log(succ)
        res.status(200).json({ type: "ok", data: succ })
    })
        .catch((err) => {
            console.log(err)
            res.send(
                {
                    "res": 204,
                    "data": err.error,
                    "message": "Ha ocurrido un error comunicate con el administrador"
                })
        });
}

const saveCai = async (req, res, next) => {
    const { numeroAutorizacion, fechaInicio, fechaFin, rangoInicial, rangoFinal, idCompania } = req.body;
    const nuevoCai = new CaiModel({
        numeroAutorizacion: numeroAutorizacion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        rangoInicial: rangoInicial,
        rangoFinal: rangoFinal,
        idCompania: idCompania
    });

    // Guardar el nuevo CAI en la base de datos
    await nuevoCai.save().then((succ) => { res.status(200).json({ type: "ok", data: succ }) })
        .catch((err) => { res.send({ "res": 204, "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });

}
const updateCai = async (req, res, next) => {
    const { numeroAutorizacion, fechaInicio, fechaFin, rangoInicial, rangoFinal, idCompania, _id } = req.body;
    const updateCai = {
        _id: _id,
        numeroAutorizacion: numeroAutorizacion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        rangoInicial: rangoInicial,
        rangoFinal: rangoFinal,
        idCompania: idCompania
    };

    // Guardar el nuevo CAI en la base de datos
    await CaiModel.findOneAndUpdate(updateCai).then((success) => {
        res.status(200).json({ type: "ok", data: succ });
    }).catch((error) => {
        res.status(204).json({ type: "error", error: error })
    })
}

const deleteCai = async (req, res, next) => {
    const { _id } = req.body;
    const deleteCai = {
        _id: _id,

    };
    CaiModel.findOneAndDelete(
        deleteCai, // query to find the user
        (err, deleted) => {
            if (err) {
                res.status(204).json({ type: "error", eroror: error });
            } else {
                res.status(200).json({ type: "ok", data: deleted });
            }
        }
    );
}

// crear el tipo de factura
const saveTipoFactura = async (req, res, next) => {
    try {
        const { tipoFactura, descripcion, correlativo } = req.body;
        const saveTipoFacturaModel = new TipoFacturaModel({
            tipoFactura: tipoFactura,
            descripcion: descripcion,
            correlativo: correlativo
        });
        await saveTipoFacturaModel.save().then((success) => {
            res.status(200).json({
                type: "ok",
                data: success
            })
        })
    } catch (error) {
        res.status(204).json({
            "type": "error",
            error: error
        })
    }
}

//CRUD PUNTO DE EMISION
const savePuntoEmision = async (req, res, next) => {
    try {
        console.log(req.body);
        const { puntoEmision, descripcion, correlativo, idCompania, activo } = req.body;
        const savePuntoEmisionModel = new PuntoEmisionModel({
            puntoEmision: puntoEmision,
            descripcion: descripcion,
            correlativo: correlativo,
            idCompania: idCompania,
            activo: activo
        });
        await savePuntoEmisionModel.save().then((success) => {
            res.status(200).json({
                type: "ok",
                data: success
            })
        })
    } catch (error) {
        res.status(204).json({
            "type": "error",
            error: error
        })
    }
}

const getPuntosEmisionByCompany = async (req, res, next) => {
    try {
        console.log();
        const {id}=req.params;
        await PuntoEmisionModel.find({"idCompania":id}).then((_data) => {
            console.log(_data);
            res.status(200).json({ "type": "ok", data: _data })
        })
        console.log(req.body);
        console.log("req.body");
        console.log(req.params);
    } catch (error) {
        res.status(400).json({ "type": "error", data: error })
    }
}

// CRUD ESTABLECIMIENTO
const saveEstablecimiento = async (req, res, next) => {
    try {
        const { establecimiento, descripcion, correlativo } = req.body;
        const saveEstablecimientoModel = new EstablecimientoModel({
            establecimiento: establecimiento,
            descripcion: descripcion,
            correlativo: correlativo
        });
        await saveEstablecimientoModel.save().then((success) => {
            res.status(200).json({
                type: "ok",
                data: success
            })
        })
    } catch (error) {
        res.status(204).json({
            "type": "error",
            error: error
        })
    }
}
module.exports = {
    saveCai,
    getCaiByCompania,
    updateCai,
    deleteCai,
    saveTipoFactura,
    savePuntoEmision,
    getPuntosEmisionByCompany,
    saveEstablecimiento
}