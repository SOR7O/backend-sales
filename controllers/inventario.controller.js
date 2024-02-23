const {
  InventarioModel,
  InventarioDetalleSalidaModel,
  InventarioDetalleEntradaModel,
  InventarioDetalleModel,
} = require("../models/inventario");

const getInventario = async (req, res, next) => {
  try {
    await InventarioModel.find({}).then((inv) => {
      res.status(200).json({ type: "ok", data: inv });
    });
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: "Ha ocurrido un error comunicate con el administrador",
    });
  }
};
const createInventario = async (req, res, next) => {
  try {
    const {
      nombre,
      descripcion,
      cantidad,
      prods,
      idCompania,
      idUser,
      typeInventario,
      productoId,
    } = req.body;

    // res.send("TODO OK")
    const createInventario = new InventarioModel({
      nombre: nombre,
      descripcion: descripcion,
      idCompania: idCompania,
      idUsuario: idUser,
    });

    await createInventario
      .save()
      .then(async (succ) => {
        let invDetalle = [];
        for (let index = 0; index < prods.length; index++) {
          let _invDetalle = {
            idInventario: succ["_id"],
            stock: prods[index]["cantidad"],
            productoId: prods[index]["idProducto"],
            typeInventario: typeInventario,
          };
          invDetalle.push(_invDetalle);
        }

        await InventarioDetalleModel.insertMany(invDetalle)
          .then(async (saved) => {
            let invEntrada = [];
            for (let i = 0; i < saved.length; i++) {
              let _invEntrada = {
                idInventarioDetalle: saved[i]["_id"],
                cantidad: saved[i]["stock"],
              };
              invEntrada.push(_invEntrada);
            }

            await InventarioDetalleEntradaModel.insertMany(invEntrada);
            res
              .status(200)
              .json({ type: "ok", data: { header: succ, body: saved } });
          })
          .catch((err) => {
            res.status(400).json({
              data: err,
              message: "2-Ha ocurrido un error comunicate con el administrador",
            });
          });
      })
      .catch((err) => {
        res.send({
          res: 400,
          data: err.error,
          message: "1-Ha ocurrido un error comunicate con el administrador",
        });
      });
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: "Ha ocurrido un error comunicate con el administrador",
    });
  }
};
const deleteInventario = async (req, res, next) => {
  try {
    const { id } = req.params;

    let _invs = await InventarioDetalleModel.find({ idInventario: id });
    await InventarioModel.findByIdAndDelete(id).then(async (success) => {
      await InventarioDetalleModel.deleteMany({
        idInventario: id,
      }).then(async (deleted) => {
        for (let i = 0; i < _invs.length; i++) {
          await InventarioDetalleEntradaModel.findOneAndDelete({
            idInventarioDetalle: _invs[i]["_id"],
          });
        }
        res
          .status(200)
          .json({ type: "ok", message: "Eliminado correctamente" });
      });
    });
  } catch (error) {
    return res.status(400).json({
      type: "error",
      message: "Ha ocurrido un error comunicate con el administrador",
    });
  }
};
const updateInventario = async (req, res, next) => {
  try {
    const { header, detalle } = req.body;

    await InventarioModel.findByIdAndUpdate(header["_id"], header).then(
      async (success) => {
        await InventarioDetalleModel.deleteMany({
          idInventario: header["_id"],
        }).then(async (deleted) => {
          for (let i = 0; i < detalle.length; i++) {
            await InventarioDetalleEntradaModel.findOneAndDelete({
              idInventarioDetalle: detalle[i]["_id"],
            });
          }
        });
        let id = header["_id"];
        let invDetalle = [];
        let prods = detalle;
        for (let index = 0; index < prods.length; index++) {
          let _invDetalle = {
            idInventario: id,
            stock: prods[index]["cantidad"],
            productoId: prods[index]["idProducto"],
            typeInventario: header["typeInventario"],
          };
          invDetalle.push(_invDetalle);
        }
        await InventarioDetalleModel.insertMany(invDetalle).then(
          async (saved) => {
            let invEntrada = [];
            for (let i = 0; i < saved.length; i++) {
              let _invEntrada = {
                idInventarioDetalle: saved[i]["_id"],
                cantidad: saved[i]["stock"],
              };
              invEntrada.push(_invEntrada);
            }

            await InventarioDetalleEntradaModel.insertMany(invEntrada);
            res.status(200).json({ type: "ok", message: "Actualizado correctamente" });
          },
        );
      },
    );
   

  } catch (error) {
    res.status(400).json({
      type: "error",
      message: "Ha ocurrido un error comunicate con el administrador",
    });
  }
};

const getinventarioByCompania = async (req, res, next) => {
  try {
    const { id } = req.params;
    await InventarioModel.find({ idCompania: id })
      .populate(["idUsuario"])
      .then(async (inv) => {
        let data = [];
        if (inv.length > 0) {
          for (const key in inv) {
            let id = inv[key]["_id"];
            let det = await InventarioDetalleModel.find({
              idInventario: id,
            }).populate(["productoId"]);
            let _inv = { header: inv[key], detalle: det };
            data.push(_inv);
          }
        }

        res.status(200).json({ type: "ok", data: data });
      });
  } catch (error) {
    res.status(400).json({
      type: "error",
      message: "Ha ocurrido un error comunicate con el administrador",
    });
  }
};
const getinventarioByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await InventarioModel.find({ idUser: id }).then((inv) => {
      res.status(200).json({ type: "ok", data: inv });
    });
  } catch (error) {
    res.status(400).json({
      type: "error",
      message: "Ha ocurrido un error comunicate con el administrador",
    });
  }
};

module.exports = {
  getInventario,
  createInventario,
  updateInventario,
  deleteInventario,
  getinventarioByCompania,
  getinventarioByUser,
};
