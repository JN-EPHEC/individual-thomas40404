import express from 'express';
const app = express();
const port = 3000;
//test
app.get('/', (req, res) => {
    res.send("Hello World");
});
//ex 1
const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];
app.get("/api/data", (req, res) => {
    res.json(etudiants);
});
//ex 2
app.get("/api/hello/:name", (req, res) => {
    const name = req.params.name; // récupère le paramètre dynamique
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString(), // date actuelle en ISO
    });
});
//ex 3
import userRoutes from "./routes/userRoutes.js";
app.use("/api", userRoutes);
//lancer serveur 
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map