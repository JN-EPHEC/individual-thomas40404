import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // nécessaire pour Supabase
        },
      },
      logging: false,
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: console.log,
    });

export default sequelize;