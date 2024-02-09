import express from 'express';
import passport from 'passport';
import { forwardAuthenticated } from '../middleware/checkAuth';

const router = express.Router();

router.get('/login', forwardAuthenticated, (req, res) => {
  const message = req.session.messages?.pop();
  res.render('login', { message: message ? message : '' });
});

const passportConfig = {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureMessage: true,
};

router.post('/login', passport.authenticate('local', passportConfig));

router.get('/github/callback', passport.authenticate('github', passportConfig));

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect('/auth/login');
});

export default router;
