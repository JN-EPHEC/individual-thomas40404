import type { Request, Response } from "express";
import User from "../models/user.js";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        if (!nom) {
            return res.status(400).json({ message: "Le champ 'nom' est requis" });
        }
        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCount = await User.destroy({ where: { id: Number(id) } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
};