import { Router } from 'express';

import {
  getCategories,
  postCategories,
  putCategories,
  deleteCategories,
  getCategory,
} from '../controllers/categories.controllers';
import { authRequiredAdmin } from '../middlewares/validateToken';
import { validateSchema } from '../middlewares/validator.middleware';
import { categorySchema } from '../schemas/categories.schema';
import { uploadMediaCategory } from '../libs/upload';

const router = Router();

router.get('/categories',  getCategories);
router.get('/categories/:id', authRequiredAdmin, getCategory);
router.post(
  '/categories',
  authRequiredAdmin,
  validateSchema(categorySchema),
  postCategories
);
router.put(
  '/categories/:id',
  authRequiredAdmin,
  validateSchema(categorySchema),
  putCategories
);
router.delete('/categories/:id', authRequiredAdmin, deleteCategories);
router.post(
  '/categories/upload',
  authRequiredAdmin,
  uploadMediaCategory
);

export default router;

