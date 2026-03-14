import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
class User extends Model {
    id;
    nom;
    prenom;
    createdAt;
    updatedAt;
}
User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
});
export default User;
//# sourceMappingURL=User.js.map