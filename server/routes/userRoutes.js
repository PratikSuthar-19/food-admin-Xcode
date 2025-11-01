import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, adminOnly } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { createUserSchema, updateUserSchema } from '../validators/user.js';

const router = express.Router();

router.get('/', protect, adminOnly, getUsers);
router.post('/', protect, adminOnly, validateBody(createUserSchema), createUser);
router.put('/:id', protect, adminOnly, validateBody(updateUserSchema), updateUser);
router.delete('/:id', protect, adminOnly, deleteUser);

export default router;
