import request from 'supertest';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import app from '../src/app';  // assuming express app is exported from here
import { createToken } from '../src/libs/jwt';
import userModel from '../src/models/user.model';


jest.mock('../models/user.model');  // Mock the User model
jest.mock('../libs/jwt');           // Mock the createToken function

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Register', () => {
    it('should register a new user successfully', async () => {
      const mockUser = { _id: '12345', username: 'testuser', email: 'test@example.com', createdAt: new Date(), updatedAt: new Date(), role: 'reader' };
      
      (userModel.findOne as jest.Mock).mockResolvedValue(null);
      (userModel.prototype.save as jest.Mock).mockResolvedValue(mockUser);
      (createToken as jest.Mock).mockResolvedValue('mockToken');

      const response = await request(app).post('/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'reader'
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: mockUser._id,
        username: mockUser.username,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        role: mockUser.role,
      });
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should return 400 if user already exists', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue({ username: 'existingUser', email: 'test@example.com' });
      
      const response = await request(app).post('/register').send({
        username: 'existingUser',
        email: 'test@example.com',
        password: 'password123',
        role: 'reader'
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual('The username and email already exists');
    });
  });

  describe('Login', () => {
    it('should login a user successfully', async () => {
      const mockUser = { _id: '12345', username: 'testuser', email: 'test@example.com', password: await bcrypt.hash('password123', 10), role: 'reader', createdAt: new Date(), updatedAt: new Date() };
      
      (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (createToken as jest.Mock).mockResolvedValue('mockToken');

      const response = await request(app).post('/login').send({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: mockUser._id,
        username: mockUser.username,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        role: mockUser.role,
      });
      expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should return 404 if user is not found', async () => {
      (userModel.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post('/login').send({
        email: 'nonexistent@example.com',
        password: 'password123'
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Email or password not found' });
    });
  });

  describe('Verify Token', () => {
    it('should verify token and return user info', async () => {
      const mockUser = { _id: '12345', username: 'testuser', email: 'test@example.com', role: 'reader' };
      
      const token = jwt.sign({ id: mockUser._id }, process.env.JWT_SECRET as string);
      (jwt.verify as jest.Mock).mockImplementation((_token, _, callback) => callback(null, { id: mockUser._id }));
      (userModel.findById as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).get('/verify-token').set('Cookie', `token=${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: mockUser._id,
        role: mockUser.role,
        username: mockUser.username,
        email: mockUser.email,
      });
    });

    it('should return 401 if token is invalid', async () => {
      (jwt.verify as jest.Mock).mockImplementation((_, __, callback) => callback(new Error('Invalid token')));

      const response = await request(app).get('/verify-token').set('Cookie', 'token=invalidToken');

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Invalid token' });
    });
  });

  describe('Logout', () => {
    it('should clear the cookie and log out the user', async () => {
      const response = await request(app).post('/logout');
      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toContainEqual(expect.stringContaining('token=;'));
    });
  });

  describe('Profile', () => {
    it('should return user profile if user exists', async () => {
      const mockUser = { _id: '12345', username: 'testuser', email: 'test@example.com', role: 'reader', createdAt: new Date(), updatedAt: new Date() };
      (userModel.findById as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).get('/profile').send({ user: { id: mockUser._id } });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: mockUser._id,
        username: mockUser.username,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
        updatedAt: mockUser.updatedAt,
        role: mockUser.role,
      });
    });

    it('should return 404 if user not found', async () => {
      (userModel.findById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/profile').send({ user: { id: 'nonexistentId' } });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });
});
