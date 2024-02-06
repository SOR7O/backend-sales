const CaiModel = require("../models/cai");
const EstablecimientoModel = require("../models/establecimiento");
const PuntoEmisionModel = require("../models/punto_emision");
const TipoFacturaModel = require("../models/tipoFactura");
// const tipoFacturaModel = require("../models/tipoFactura");

const getCaiByCompania = async (req, res, next) => {

    const { id } = req.params;
    await CaiModel.find({ idCompania: id }).populate(['idEstablecimiento','idPuntoEmision','idTipoDocumento']).then((succ) => {
        res.status(200).json({ type: "ok", data: succ })
    })
        .catch((err) => {
            
            res.send(
                {
                    "res": 204,
                    "data": err.error,
                    "message": "Ha ocurrido un error comunicate con el administrador"
                })
        });
}

const saveCai = async (req, res, next) => {
    
    const { numeroAutorizacion, fechaInicio, fechaFin, rangoInicial, rangoFinal, idCompania, activo, numeroFactura,idPuntoEmision,idEstablecimiento,idTipoDocumento } = req.body;
    const nuevoCai = new CaiModel({
        numeroAutorizacion: numeroAutorizacion,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        rangoInicial: rangoInicial,
        rangoFinal: rangoFinal,
        idCompania: idCompania,
        numeroInicial: numeroFactura,
        idPuntoEmision: idPuntoEmision['id'],
        idTipoDocumento: idTipoDocumento['id'],
        idEstablecimiento: idEstablecimiento['id'],
        activo: activo
    });

    // Guardar el nuevo CAI en la base de datos
    await nuevoCai.save().then((succ) => {  res.status(200).json({ type: "ok", data: succ }) })
        .catch((err) => { res.status({ "res": 204, "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });

}
const updateCai = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const { numeroAutorizacion, fechaInicio, fechaFin, rangoInicial, rangoFinal, idCompania, activo, numeroInicial ,idPuntoEmision,idEstablecimiento,idTipoDocumento} = req.body;
        const _updateCai = {
            numeroAutorizacion: numeroAutorizacion,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            rangoInicial: rangoInicial,
            rangoFinal: rangoFinal,
            idCompania: idCompania,
            numeroInicial: numeroInicial,
            idPuntoEmision: idPuntoEmision['id'],
            idTipoDocumento: idTipoDocumento['id'],
            idEstablecimiento: idEstablecimiento['id'],
            activo: activo,
        };

        // Guardar el nuevo CAI en la base de datos
        await CaiModel.findByIdAndUpdate(id, _updateCai).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}

const deleteCai = async (req, res, next) => {
    try {
        const { id } = req.params;
        await CaiModel.findByIdAndDelete(id).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}


// crear el tipo de factura
const saveTipoFactura = async (req, res, next) => {
    try {
        const { tipoFactura, descripcion, correlativo, idCompania, activo } = req.body;
        const saveTipoFacturaModel = new TipoFacturaModel({
            tipoFactura: tipoFactura,
            descripcion: descripcion,
            idCompania: idCompania,
            activo: activo,
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

        const { id } = req.params;
        await PuntoEmisionModel.find({ "idCompania": id }).then((_data) => {
            
            res.status(200).json({ "type": "ok", data: _data })
        })

    } catch (error) {
        res.status(400).json({ "type": "error", data: error })
    }
}
const updatePuntoEmision = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { puntoEmision, descripcion, correlativo, idCompania, activo } = req.body;
        const _updatePuntoEmision = {
            puntoEmision: puntoEmision,
            descripcion: descripcion,
            correlativo: correlativo,
            idCompania: idCompania,
            activo: activo
        };
        await PuntoEmisionModel.findByIdAndUpdate(id, _updatePuntoEmision).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}
const deletePuntoEmision = async (req, res, next) => {

    try {
        const { id } = req.params;
        await PuntoEmisionModel.findByIdAndDelete(id).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}

// CRUD ESTABLECIMIENTO
const getEstablecimientoByCompany = async (req, res, next) => {
    try {

        const { id } = req.params;
        await EstablecimientoModel.find({ "idCompania": id }).then((_data) => {
            
            res.status(200).json({ "type": "ok", data: _data })
        })

    } catch (error) {
        res.status(400).json({ "type": "error", data: error })
    }
}
const saveEstablecimiento = async (req, res, next) => {
    try {
        const { establecimiento, descripcion, correlativo, idCompania, activo } = req.body;
        const saveEstablecimientoModel = new EstablecimientoModel({
            establecimiento: establecimiento,
            descripcion: descripcion,
            idCompania: idCompania,
            correlativo: correlativo,
            activo: activo
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
const updateEstablecimiento = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { establecimiento, descripcion, correlativo, idCompania, activo } = req.body;
        const _updateEstablecimiento = {
            establecimiento: establecimiento,
            descripcion: descripcion,
            idCompania: idCompania,
            correlativo: correlativo,
            activo: activo
        };
        await EstablecimientoModel.findByIdAndUpdate(id, _updateEstablecimiento).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}
const deleteEstablecimiento = async (req, res, next) => {

    try {
        const { id } = req.params;
        await EstablecimientoModel.findByIdAndDelete(id).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}


// CRUD TIPO DE DOCUMENTOS
const getTipoDocumentoByCompany = async (req, res, next) => {
    try {

        const { id } = req.params;
        await TipoFacturaModel.find({ "idCompania": id }).then((_data) => {
            
            res.status(200).json({ "type": "ok", data: _data })
        })

    } catch (error) {
        res.status(400).json({ "type": "error", data: error })
    }
}
const saveTipoDocumento = async (req, res, next) => {
    try {
        const { tipoFactura, descripcion, correlativo, idCompania, activo } = req.body;
        const saveTipoDocumento = new TipoFacturaModel({
            tipoFactura: tipoFactura,
            descripcion: descripcion,
            idCompania: idCompania,
            correlativo: correlativo,
            activo: activo
        });
        await saveTipoDocumento.save().then((success) => {
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
const updateTipoDocumento = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { tipoFactura, descripcion, correlativo, idCompania, activo } = req.body;
        const _tipoFactura = {
            tipoFactura: tipoFactura,
            descripcion: descripcion,
            idCompania: idCompania,
            correlativo: correlativo,
            activo: activo
        };
        await TipoFacturaModel.findByIdAndUpdate(id, _tipoFactura).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}
const deleteTipoDocumento = async (req, res, next) => {

    try {
        const { id } = req.params;
        await TipoFacturaModel.findByIdAndDelete(id).then((success) => {
            res.status(200).json({ type: "ok", data: success });
        }).catch((error) => {
            res.status(400).json({ type: "error", error: error })
        });
    } catch (error) {
        res.status(400).json({ type: "error", error: error });
    }
}


module.exports = {
    saveCai,
    getCaiByCompania,
    updateCai,
    deleteCai,
    saveTipoFactura,
    getTipoDocumentoByCompany,
    updateTipoDocumento,
    deleteTipoDocumento,
    savePuntoEmision,
    getPuntosEmisionByCompany,
    updatePuntoEmision,
    deletePuntoEmision,
    saveEstablecimiento,
    getEstablecimientoByCompany,
    updateEstablecimiento,
    deleteEstablecimiento
}