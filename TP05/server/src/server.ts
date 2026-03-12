import express from 'express';
import type { Request, Response } from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';
import User from './models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from './middlewares/errorHandler.js';
import {checkIdParam} from './middlewares/check.js';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cors from 'cors';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(cors()); // Autorise tout le monde (acceptable uniquement en dev)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(requestLogger);

app.use(checkIdParam)

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/users', userRoutes);

sequelize.authenticate()
  .then(() => console.log('Connexion à la DB réussie !'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('Erreur de connexion :', err.message);
    } else {
      console.error('Erreur de connexion inconnue :', err);
    }
  });
  app.use(errorHandler);

sequelize.sync()
  .then(async () => {
    console.log('Synchronisation des modèles OK');
    const count = await User.count();
    if (count === 0) {
      try {
        const john = await User.create({ nom: 'John', prenom: 'Doe' });
        console.log('Utilisateur ajouté :', john.toJSON());
      } catch (err: any) {
        console.error('Erreur lors de l’ajout de l’utilisateur :', err.message);
      }
    }
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('Erreur de sync :', err.message);
    } else {
      console.error('Erreur de sync inconnue :', err);
    }
  });
