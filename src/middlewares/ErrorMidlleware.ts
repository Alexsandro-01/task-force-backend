import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

function errorMidlleware(
  error: Error | ZodError,
  _req: Request,
  res: Response,
  _nex: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.issues[0].message });
  }

  res.status(500).json({ message: error.message });
}

export default errorMidlleware;