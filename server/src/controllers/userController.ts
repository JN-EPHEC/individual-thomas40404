import type { Request, Response } from "express";
import { UserService } from "../services/userService.js";

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch {
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const user = await userService.createUser(nom, prenom);
        res.status(201).json(user);
    } catch {
        res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await userService.deleteUser(id);

        if (deleted) {
            res.status(200).json({ message: "Utilisateur supprimé" });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    } catch {
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
};