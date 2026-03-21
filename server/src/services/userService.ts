import User from "../models/User.js";

export class UserService {
    async getAllUsers() {
        return await User.findAll();
    }

    async createUser(nom: string, prenom: string) {
        return await User.create({ nom, prenom });
    }

    async deleteUser(id: number) {
        const deleted = await User.destroy({ where: { id } });
        return deleted > 0;
    }
}