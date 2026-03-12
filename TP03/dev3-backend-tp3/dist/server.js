"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const database_js_1 = __importDefault(require("./config/database.js"));
const user_js_1 = __importDefault(require("./models/user.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// test route
app.get('/test', (req, res) => {
    res.send("Hello World");
});
app.get("/api/data", async (req, res) => {
    try {
        const users = await user_js_1.default.findAll();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
});
// route with dynamic parameter
app.get("/api/hello/:name", (req, res) => {
    const name = req.params.name;
    res.json({
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString(),
    });
});
app.use(express_1.default.json());
app.use("/api", userRoutes_js_1.default);
database_js_1.default.sync()
    .then(() => {
    console.log("Base de données synchronisée");
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
})
    .catch((error) => {
    console.error("Erreur de connexion à la base :", error);
});
