import { Request, Response, NextFunction } from 'express';

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/login');
};

export const ensureAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) return res.redirect('auth/login');
  if (req.user.role === 'admin') return next();
  res.sendStatus(404);
};

export const forwardAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/dashboard');
};
