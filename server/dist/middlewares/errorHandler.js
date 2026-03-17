export function errorHandler(err, req, res, next) {
    console.error(err.stack); // log complet pour le debug
    const status = err.status || 500;
    res.status(status).json({ message: err.message });
}
//# sourceMappingURL=errorHandler.js.map