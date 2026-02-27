import type { Request, Response, NextFunction } from "express";

export const checkIdParam = (
    req: Request,
    res: Response,
    next: NextFunction) => {
  const  idParam  = req.params.id;
  if (!idParam) return next();

  if (!idParam || !Number.isInteger(Number(idParam))) {
    return res.status(400).json({ message: "Invalid ID parameter" });
  }

  next();
};