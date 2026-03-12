"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const user_js_1 = __importDefault(require("../models/user.js"));
const router = (0, express_1.Router)();
// GET /api/users
router.get("/users", async (req, res) => {
    try {
        const users = await user_js_1.default.findAll();
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
        const { nom, prenom } = req.body;
        if (!nom) {
            return res.status(400).json({ message: "Le champ 'nom' est requis" });
        }
        const newUser = await user_js_1.default.create({ nom, prenom });
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
        const deletedCount = await user_js_1.default.destroy({ where: { id: Number(id) } });
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
exports.default = router;
