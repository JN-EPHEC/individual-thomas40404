import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {
  public id!: number;
  public nom!: string;
  public prenom!: string;

  public readonly createdAt!: Date; 
  public readonly updatedAt!: Date;
}

User.init(
  {
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
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
