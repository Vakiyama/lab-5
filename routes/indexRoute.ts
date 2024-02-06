import express from 'express';
const router = express.Router();
import { ensureAuthenticated } from '../middleware/checkAuth';

router.get('/', (_, res) => {
  res.send('<a href="/auth/login">login</a>');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.user,
  });
});

export default router;
