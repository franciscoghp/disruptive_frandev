import jwt  from 'jsonwebtoken';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import express from 'express';
import { createToken } from '../libs/jwt';

const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password, role } = req.body;
    const userFound = await User.findOne({ email, username });

    if (userFound) {
      return res.status(400).json('The username and email already exists');
    }
    const pswHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: pswHash, role });
    const userSaved = await newUser.save();
    const token = await createToken({
      id: userSaved._id,
    });
    res.cookie('token', token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      role: userSaved.role,
    });
  } catch (error: any) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(401).json(['The username or email already exists']);
    }
    res.status(500).json([error.message]);
  }
};
const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  try {
    const UserFound = await User.findOne({ email });
    if (!UserFound) {
      return res.status(404).json({ message: 'Email or password not found' });
    }
    const isMatchPassword = await bcrypt.compare(password, UserFound.password);
    if (!isMatchPassword) {
      return res.status(401).json(['Invalid password']);
    }
    const token = await createToken({
      id: UserFound._id,
      role: UserFound.role,
    });
    res.cookie('token', token);
    return res.json({
      id: UserFound._id,
      username: UserFound.username,
      email: UserFound.email,
      createdAt: UserFound.createdAt,
      updatedAt: UserFound.updatedAt,
      role: UserFound.role,
    });
  } catch (error: any) {
    return res.status(500).json([error.message]);
  }
};

const verifyToken = async (req: express.Request, res: express.Response) => {
  const token = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(
    token.token,
    process.env.JWT_SECRET as string,
    async (err: any, user: any) => {
      if (err) return res.status(401).json({ message: 'Invalid token' });
      const UserFound = await User.findById(user.id);
      if (!UserFound)
        return res.status(404).json({ message: 'User unauthorized' });
      return res.json({
        id: UserFound._id,
        role: UserFound.role,
        username: UserFound.username,
        email: UserFound.email,
      });
    }
  );
};

const logout = (_req: express.Request, res: express.Response) => {
  res.clearCookie('token');
  res.sendStatus(200);
};

const profile = async (req: express.Request, res: express.Response) => {
  const userFound = await User.findById({ _id: req.body.user.id });
  if (!userFound) return res.status(404).json({ message: 'User not found' });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
    role: userFound.role,
  });
};

export { register, login, logout, profile, verifyToken };


