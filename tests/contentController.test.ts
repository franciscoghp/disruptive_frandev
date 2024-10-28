import request from 'supertest';
import express from 'express';
import Content from '../src/models/content.model';
import Category from '../src/models/category.model';
import {
  getContents,
  getContent,
  postContent,
  putContent,
  deleteContent,
} from '../src/controllers/content.controllers';

jest.mock('../models/content.model');  // Mock Content model
jest.mock('../models/category.model'); // Mock Category model

const app = express();
app.use(express.json());

// Configura rutas para las pruebas
app.get('/contents', getContents);
app.get('/contents/:id', getContent);
app.post('/contents', postContent);
app.put('/contents/:id', putContent);
app.delete('/contents/:id', deleteContent);

describe('Content Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /contents', () => {
    it('should return all contents', async () => {
      const mockContents = [{ name_theme: 'Theme1' }, { name_theme: 'Theme2' }];
      (Content.find as jest.Mock).mockResolvedValue(mockContents);

      const response = await request(app).get('/contents');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContents);
    });

    it('should return 404 if no contents are found', async () => {
      (Content.find as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/contents');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Content not found' });
    });
  });

  describe('GET /contents/:id', () => {
    it('should return a specific content by ID', async () => {
      const mockContent = { _id: '123', name_theme: 'Theme1' };
      (Content.findById as jest.Mock).mockResolvedValue(mockContent);

      const response = await request(app).get('/contents/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContent);
    });

    it('should return 404 if content not found', async () => {
      (Content.findById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/contents/invalidId');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Content not found' });
    });
  });

  describe('POST /contents', () => {
    it('should create a new content successfully', async () => {
      const mockCategories = [{ name: 'Theme1' }];
      const mockContent = {
        _id: '123',
        name_theme: 'Theme1',
        url_image: 'http://example.com/image.jpg',
        url_video: 'http://example.com/video.mp4',
        content_text: 'Sample content text',
        credits: 'Author Name',
      };

      (Category.find as jest.Mock).mockResolvedValue(mockCategories);
      (Content.prototype.save as jest.Mock).mockResolvedValue(mockContent);

      const response = await request(app).post('/contents').send({
        name_theme: 'Theme1',
        url_image: 'http://example.com/image.jpg',
        url_video: 'http://example.com/video.mp4',
        content_text: 'Sample content text',
        credits: 'Author Name',
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockContent);
    });

    it('should return 404 if category not found', async () => {
      (Category.find as jest.Mock).mockResolvedValue([]);

      const response = await request(app).post('/contents').send({
        name_theme: 'Nonexistent Theme',
        url_image: 'http://example.com/image.jpg',
        url_video: 'http://example.com/video.mp4',
        content_text: 'Sample content text',
        credits: 'Author Name',
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Category not found' });
    });

    it('should return 500 if content save fails', async () => {
      const mockCategories = [{ name: 'Theme1' }];
      (Category.find as jest.Mock).mockResolvedValue(mockCategories);
      (Content.prototype.save as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post('/contents').send({
        name_theme: 'Theme1',
        url_image: 'http://example.com/image.jpg',
        url_video: 'http://example.com/video.mp4',
        content_text: 'Sample content text',
        credits: 'Author Name',
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Error' });
    });
  });

  describe('PUT /contents/:id', () => {
    it('should update a content successfully', async () => {
      const updatedContent = { _id: '123', name_theme: 'Updated Theme' };
      (Content.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedContent);

      const response = await request(app)
        .put('/contents/123')
        .send({ name_theme: 'Updated Theme' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedContent);
    });

    it('should return 404 if content not found', async () => {
      (Content.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/contents/nonexistentId')
        .send({ name_theme: 'Updated Theme' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Content not found' });
    });
  });

  describe('DELETE /contents/:id', () => {
    it('should delete a content successfully', async () => {
      (Content.findByIdAndDelete as jest.Mock).mockResolvedValue({
        _id: '123',
        name_theme: 'Content to delete',
      });

      const response = await request(app).delete('/contents/123');

      expect(response.status).toBe(204);
    });

    it('should return 404 if content not found', async () => {
      (Content.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/contents/nonexistentId');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Content not found' });
    });
  });
});
