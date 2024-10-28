import request from 'supertest';
import express from 'express';
import Permission from '../src/models/permission.model';
import {
  getPermissions,
  postPermissions,
  putPermissions,
  deletePermissions,
} from '../src/controllers/permissions.controllers';

jest.mock('../models/permission.model'); // Mock Permission model

const app = express();
app.use(express.json());

// Configura rutas para las pruebas
app.get('/permissions', getPermissions);
app.post('/permissions', postPermissions);
app.put('/permissions/:id', putPermissions);
app.delete('/permissions/:id', deletePermissions);

describe('Permission Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /permissions', () => {
    it('should return all permissions', async () => {
      const mockPermissions = [{ name: 'Read' }, { name: 'Write' }];
      (Permission.find as jest.Mock).mockResolvedValue(mockPermissions);

      const response = await request(app).get('/permissions');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPermissions);
    });
  });

  describe('POST /permissions', () => {
    it('should create a new permission successfully', async () => {
      const mockPermission = { _id: '123', name: 'Read' };
      (Permission.prototype.save as jest.Mock).mockResolvedValue(mockPermission);

      const response = await request(app)
        .post('/permissions')
        .send({ name: 'Read' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPermission);
    });

    it('should return 500 if saving permission fails', async () => {
      (Permission.prototype.save as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/permissions')
        .send({ name: 'Read' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error' });
    });
  });

  describe('PUT /permissions/:id', () => {
    it('should update a permission successfully', async () => {
      const updatedPermission = { _id: '123', name: 'Write' };
      (Permission.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedPermission);

      const response = await request(app)
        .put('/permissions/123')
        .send({ name: 'Write' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedPermission);
    });

    it('should return 404 if permission not found', async () => {
      (Permission.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/permissions/nonexistentId')
        .send({ name: 'Write' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Permission not found' });
    });
  });

  describe('DELETE /permissions/:id', () => {
    it('should delete a permission successfully', async () => {
      (Permission.findByIdAndDelete as jest.Mock).mockResolvedValue({
        _id: '123',
        name: 'Permission to delete',
      });

      const response = await request(app).delete('/permissions/123');

      expect(response.status).toBe(204);
    });

    it('should return 404 if permission not found', async () => {
      (Permission.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/permissions/nonexistentId');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Permission not found' });
    });
  });
});
