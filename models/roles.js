const mongoose = require("mongoose");

// export const ROLES=['super','admininistrador','cliente']

const rolesSchema = new mongoose.Schema(
    { 
        nombre: String 
    },
    {
        versionKey: false
    }
)

// const RolesModel= mongoose.model("Roles",rolesSchema);
module.exports = mongoose.model("Roles", rolesSchema);