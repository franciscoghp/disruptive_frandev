import { Router } from 'express';

import {
  getContents,
  getContent,
  postContent,
  putContent,
  deleteContent,
} from '../controllers/content.controllers';
import {
  authRequiredAdminOrCreators,
  authRequired,
  authRequiredAdmin,
} from '../middlewares/validateToken';
import { validateSchema } from '../middlewares/validator.middleware';
import { contentSchema } from '../schemas/content.schema';
import { uploadMediaContent } from '../libs/upload';

const router = Router();

router.get('/contents', authRequired, getContents);
router.get('/contents/:id', authRequired, getContent);
router.post(
  '/contents',
  authRequiredAdminOrCreators,
  validateSchema(contentSchema),
  postContent
);
router.put(
  '/contents/:id',
  authRequiredAdminOrCreators,
  validateSchema(contentSchema),
  putContent
);
router.delete('/contents/:id', authRequiredAdmin, deleteContent);
router.post(
  '/contents/upload',
  authRequiredAdminOrCreators,
  uploadMediaContent
);

export default router;

