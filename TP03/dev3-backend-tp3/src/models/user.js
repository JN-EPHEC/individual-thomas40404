"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_js_1 = require("../config/database.js");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
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
