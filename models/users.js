const mongoose = require('mongoose');

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
    ref:"role",
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