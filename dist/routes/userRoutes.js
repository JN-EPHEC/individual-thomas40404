// src/routes/userRoutes.ts
import { Router } from "express";
const router = Router();
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
];
// GET /api/users
router.get("/users", (req, res) => {
    res.json(users);
});
export default router;
//# sourceMappingURL=userRoutes.js.map