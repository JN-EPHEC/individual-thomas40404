export const checkIdParam = (req, res, next) => {
    const idParam = req.params.id;
    if (!idParam)
        return next();
    if (!idParam || !Number.isInteger(Number(idParam))) {
        return res.status(400).json({ message: "Invalid ID parameter" });
    }
    next();
};
//# sourceMappingURL=check.js.map