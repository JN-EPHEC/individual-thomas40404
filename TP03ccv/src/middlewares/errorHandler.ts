import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack); // log complet pour le debug
  const status = err.status || 500;
  res.status(status).json({ message: err.message });
}