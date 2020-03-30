import express from 'express';

import idp from './idp';
import token from './token';

const router = express.Router();
router.get('/idp', idp);
router.post('/token', token);

export default router;
