import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import { sequelize } from "./db.js";
const app = express();
app.use(express.json());
// Serve static files from the public folder using process.cwd()
app.use(express.static(path.join(process.cwd(), "public")));
// Serve index.html on root path
app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});
// Example API routes
app.get("/api/data", (req, res) => {
    res.json({ data: "Some data" });
});
app.get("/api/hello/:name", (req, res) => {
    const { name } = req.params;
    res.json({ message: `Hello, ${name}!` });
});
// User routes
app.use("/api/users", userRoutes);
const PORT = 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
//# sourceMappingURL=userController.js.map