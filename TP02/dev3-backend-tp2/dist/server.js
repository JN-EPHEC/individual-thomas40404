import express from 'express';
import sequelize from './config/database.js';
import User from './models/user.js';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, "../public")));
//tp01
//test --> test
app.get('/test', (req, res) => {
    res.send("Hello World");
});
app.get("/api/data", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
});
//ex 1 --> api/data
/*
const etudiants = [
  { id: 1, nom: "Dupont", prenom: "Jean" },
  { id: 2, nom: "Martin", prenom: "Sophie" },
  { id: 3, nom: "Doe", prenom: "John" },
];
app.get("/api/data", (req: Request, res: Response) => {
  res.json(etudiants);
});
*/
//ex 2 --> api/hello/name
app.get("/api/hello/:name", (req, res) => {
    const name = req.params.name; // récupère le paramètre dynamique
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString(), // date actuelle en ISO
    });
});
//ex 3 --> api/users
import userRoutes from "./routes/userRoutes.js";
//lancer serveur 
app.use(express.json());
app.use("/api", userRoutes);
sequelize.sync()
    .then(() => {
    console.log("Base de données synchronisée");
    // user.create({nom: "DUDU", prenom: "BOB"}).then(() => { 
    //   console.log("Utilisateur test ajouté");
    // })
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
})
    .catch((error) => {
    console.error("Erreur de connexion à la base :", error);
});
//# sourceMappingURL=server.js.map