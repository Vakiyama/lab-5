import express from 'express';
import passport from 'passport';
import { forwardAuthenticated } from '../middleware/checkAuth';

const router = express.Router();

declare module 'express-session' {
  interface SessionData {
    messages: string[];
  }
}

router.get('/login', forwardAuthenticated, (req, res) => {
  const message = req.session.messages?.pop();
  res.render('login', { message: message ? message : '' });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureMessage: true,
  })
);

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect('/auth/login');
});

export default router;
