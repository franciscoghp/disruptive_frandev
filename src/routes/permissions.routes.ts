import { Router } from 'express';
import {
  getPermissions,
  postPermissions,
  putPermissions,
  deletePermissions,
} from '../controllers/permissions.controllers';
import { authRequiredAdmin } from '../middlewares/validateToken';

const router = Router();

router.get('/permissions', getPermissions);
router.post('/permissions', authRequiredAdmin, postPermissions);
router.put('/permissions/:id', authRequiredAdmin, putPermissions);
router.delete('/permissions/:id', authRequiredAdmin, deletePermissions);

export default router;

