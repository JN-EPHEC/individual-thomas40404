// src/routes/userRoutes.ts
import { Router } from "express";
import type { Request, Response } from "express";
import User from "../models/user.js";
const router = Router();

// GET /api/users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

// POST /api/users - créer un utilisateur
router.post("/users", async (req: Request, res: Response) => {
  try {
    const { nom, prenom } = req.body;
    if (!nom) {
      return res.status(400).json({ message: "Le champ 'nom' est requis" });
    }
    const newUser = await User.create({ nom, prenom });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

// DELETE /api/users/:id - supprimer un utilisateur
router.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCount = await User.destroy({ where: { id: Number(id) } });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

export default router;