import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';
import userModel from '../models/user.model';

const authRequired = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  dotenv.config();
  const token = req.cookies;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  jwt.verify(
    token.token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      req.body.user = decoded;
      next();
    }
  );
};
const authRequiredAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  dotenv.config();
  const token = req.cookies;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  jwt.verify(
    token.token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      req.body.user = decoded;
      const UserFound = await userModel.findById(decoded.id);
      if (UserFound?.role !== 'admin')
        return res
          .status(401)
          .json({ message: 'Invalid token your not admin' });
      next();
    }
  );
};

const authRequiredAdminOrCreators = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  dotenv.config();
  const token = req.cookies;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  jwt.verify(
    token.token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      req.body.user = decoded;
      const UserFound = await userModel.findById(decoded.id);
      if (UserFound?.role !== 'admin' && UserFound?.role !== 'creators')
        return res
          .status(401)
          .json({ message: 'Invalid token your not admin or creators' });
      next();
    }
  );
};

const authNotRequired = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log('auth not required', req, res);
  next();
};
export {
  authRequired,
  authRequiredAdmin,
  authNotRequired,
  authRequiredAdminOrCreators,
};

