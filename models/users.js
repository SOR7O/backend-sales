const mongoose = require('mongoose');
const CompaniaModel = require("./compania");
const RoleModel = require("./roles");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  idCompania: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'compania'
  },
  typeUser: {
    type: Number,
    required: false,
  },
  telefono: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now()
  },
  latlng: {
    type: String,
    required: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"role"
  },
  is_activated: {
    type: Boolean,
    required: false,
    default: false,
  },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;