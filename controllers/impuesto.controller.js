const ImpuestoModel = require("../models/impuesto");

const getImpuestos = async (req, res, next) => {
  try {
    await ImpuestoModel.find({}).then((imp) => {
      res.status(200).json({ type: "ok", data: imp });
    })
  } catch (error) {
    res.status(400).json({ type: "error", data: error })
  }
}

const crearImpuesto = async (req, res, next) => {
  try {
    const { nombre, correlativo, valor } = req.body;
    const newImpuesto = new ImpuestoModel({
      nombre: nombre, correlativo: correlativo, valor: valor
    });
    await newImpuesto.save().save().then((succ) => {
      res.status(202).json({ type: "ok", data: succ })
    }
    ).catch((err) => { res.send({ "res": 200, "data": err.error, "message": "Ha ocurrido un error comunicate con el administrador" }) });
  } catch (error) {
    return res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
  }
}
const actualizarImpuesto = async (req, res, next) => {
  try {
    const { nombre, correlativo, valor, _id } = req.body;
    const updateImpuesto = {
      nombre: nombre, correlativo: correlativo, valor: valor
    };
    await ImpuestoModel.findByIdAndUpdate({ _id: _id }, updateImpuesto).then((success) => {
      res.status(202).json({ type: "ok", data: success })
    }).catch((err) => {
      res.status(204).json({ type: "ok", message: "Ha ocurrido un error, comunicate con el administrador", error: err })
    })
  } catch (error) {
    res.status(400).json({ "type": "error", error: error })
  }
}

const deleteImpuesto = async (req, res, next) => {
  const { _id } = req.body
  try {
    await ImpuestoModel.findOneAndDelete({ _id: _id }).then((succ) => {
      res.status(200).json({ type: "ok", message: "Eliminado correctamente", data: succ })
    }).catch((err) => res.status(400).json({ "message": "Ha ocurrido un error" }))
  } catch (error) {
    res.status(400).json({ type: "error", message: 'Ha ocurrido un error comunicate con el administrador' })
  }

}

module.exports = {
  getImpuestos,
  crearImpuesto,
  actualizarImpuesto,
  deleteImpuesto
}
