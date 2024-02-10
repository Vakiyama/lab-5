import express, { Request } from 'express';
const router = express.Router();
import { promisify } from 'util';
import { ensureAdmin, ensureAuthenticated } from '../middleware/checkAuth';

router.get('/', (_, res) => {
  res.send('<a href="/auth/login">login</a>');
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  res.render('dashboard', {
    user: req.user,
    sessions: null,
  });
});

async function getAllSessions(req: Request) {
  return new Promise((resolve, reject) => {
    if (!req.sessionStore.all) return reject('no sessions');
    req.sessionStore.all((err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

async function destroySession(sessionID: string, req: Request) {
  return new Promise<void>((resolve, reject) => {
    if (req.sessionStore.destroy === undefined)
      return reject('no session store');
    console.log(sessionID);
    req.sessionStore.destroy(sessionID, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

router.get('/admin', ensureAdmin, async (req, res) => {
  res.render('dashboard', {
    user: req.user,
    sessions: await getAllSessions(req),
  });
});

router.post(
  '/admin/revoke/:sessionID',
  ensureAuthenticated,
  async (req, res) => {
    const sessionID = req.params.sessionID;
    try {
      await destroySession(sessionID, req);
      res.redirect('/admin');
    } catch (e) {
      console.log(e);
      res.send('sessionID does not exist');
    }
  }
);

export default router;
