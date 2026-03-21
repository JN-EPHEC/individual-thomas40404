import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private static instance: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            console.log(process.env.DATABASE_URL);
            Database.instance = process.env.DATABASE_URL
                ? new Sequelize(process.env.DATABASE_URL, {
                      dialect: 'postgres',
                      dialectOptions: {
                          ssl: {
                              require: true,
                              rejectUnauthorized: false,
                          },
                      },
                      logging: false,
                  })
                : new Sequelize({
                      dialect: 'sqlite',
                      storage: './database.sqlite',
                      logging: console.log,
                  });
        }
        return Database.instance;
    }
}

export default Database.getInstance();