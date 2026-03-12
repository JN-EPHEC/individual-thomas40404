"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../config/database.js"));
class User extends sequelize_1.Model {
}
User.init({
    // Model attributes are defined here
    nom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: sequelize_1.DataTypes.STRING,
        // allowNull defaults to true
    },
}, {
    // Other model options go here
    sequelize: database_js_1.default, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
});
// the defined model is the class itself
console.log(User === database_js_1.default.models.User); // true
exports.default = User;
