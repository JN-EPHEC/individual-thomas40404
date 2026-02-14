// src/routes/userRoutes.ts
import { Router } from "express";
import User from "../models/user.js";
const router = Router();
// GET /api/users
router.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
});
// POST /api/users - créer un utilisateur
router.post("/users", async (req, res) => {
    try {
        const { nom, prenom, username, password } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Le champ 'username' est requis" });
        }
        if (!password) {
            return res.status(400).json({ message: "Le champ 'password' est requis" });
        }
        const newUser = await User.create({ nom, prenom, username, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
});
// DELETE /api/users/:id - supprimer un utilisateur
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await User.destroy({ where: { id: Number(id) } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json({ message: "Utilisateur supprimé" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
});
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ message: "Nom et mot de passe requis" });
    try {
        const user = await User.findOne({ where: { username, password } });
        if (!user)
            return res.status(404).json({ message: "Utilisateur inconnu" });
        res.status(200).json({ message: "Connexion réussie" });
    }
    catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});
export default router;
//# sourceMappingURL=userRoutes.js.map