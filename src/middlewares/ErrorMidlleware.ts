import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

function errorMidlleware(
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _nex: NextFunction,
) {

  const status: Record<string, number> = {
    Unauthorized: 401,
  };

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.issues[0].message });
  }

  if (status[error.name]) {
    return res.status(status[error.name]).json({ message: error.message });
  }
  
  res.status(500).json({ message: error.message });
}

export default errorMidlleware;