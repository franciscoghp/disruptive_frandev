import request from 'supertest';
import express from 'express';
import {
  getCategories,
  getCategory,
  postCategories,
  putCategories,
  deleteCategories,
} from '../src/controllers/categories.controllers';
import Category from '../src/models/category.model';
import Permission from '../src/models/permission.model';

jest.mock('../models/category.model');  // Mock Category model
jest.mock('../models/permission.model'); // Mock Permission model

const app = express();
app.use(express.json());

// Setup routes
app.get('/categories', getCategories);
app.get('/categories/:id', getCategory);
app.post('/categories', postCategories);
app.put('/categories/:id', putCategories);
app.delete('/categories/:id', deleteCategories);

describe('Category Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /categories', () => {
    it('should return all categories', async () => {
      const mockCategories = [{ name: 'Category1' }, { name: 'Category2' }];
      (Category.find as jest.Mock).mockResolvedValue(mockCategories);

      const response = await request(app).get('/categories');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategories);
    });
  });

  describe('GET /categories/:id', () => {
    it('should return a specific category by ID', async () => {
      const mockCategory = { _id: '123', name: 'Category1' };
      (Category.findById as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app).get('/categories/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategory);
    });

    it('should return 404 if category not found', async () => {
      (Category.findById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/categories/invalidId');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Category not found' });
    });
  });

  describe('POST /categories', () => {
    it('should create a new category successfully', async () => {
      const mockPermissions = [{ name: 'permission1' }, { name: 'permission2' }];
      const mockCategory = {
        _id: '123',
        name: 'New Category',
        permissions: ['permission1', 'permission2'],
        cover: '',
      };

      (Permission.find as jest.Mock).mockResolvedValue(mockPermissions);
      (Category.prototype.save as jest.Mock).mockResolvedValue(mockCategory);

      const response = await request(app)
        .post('/categories')
        .send({
          name: 'New Category',
          permissions: ['permission1', 'permission2'],
          cover: '',
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategory);
    });

    it('should return 404 if permissions are missing', async () => {
      (Permission.find as jest.Mock).mockResolvedValue([]);

      const response = await request(app)
        .post('/categories')
        .send({
          name: 'New Category',
          permissions: ['nonexistent_permission'],
          cover: '',
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Permission is empty' });
    });

    it('should return 401 if category already exists', async () => {
      const duplicateError = { code: 11000 };
      (Category.prototype.save as jest.Mock).mockRejectedValue(duplicateError);

      const response = await request(app)
        .post('/categories')
        .send({
          name: 'Duplicate Category',
          permissions: ['permission1'],
          cover: '',
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual(['The category already exists']);
    });
  });

  describe('PUT /categories/:id', () => {
    it('should update a category successfully', async () => {
      const updatedCategory = { _id: '123', name: 'Updated Category' };
      (Category.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedCategory);

      const response = await request(app)
        .put('/categories/123')
        .send({ name: 'Updated Category' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedCategory);
    });

    it('should return 404 if category not found', async () => {
      (Category.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/categories/nonexistentId')
        .send({ name: 'Updated Category' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Category not found' });
    });
  });

  describe('DELETE /categories/:id', () => {
    it('should delete a category successfully', async () => {
      (Category.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: '123', name: 'Category to delete' });

      const response = await request(app).delete('/categories/123');

      expect(response.status).toBe(204);
    });

    it('should return 404 if category not found', async () => {
      (Category.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/categories/nonexistentId');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Category not found' });
    });
  });
});
