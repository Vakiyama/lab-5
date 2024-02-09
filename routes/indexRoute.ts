import express, { Request } from 'express';
const router = express.Router();
import { promisify } from 'util';
import { ensureAuthenticated } from '../middleware/checkAuth';

router.get('/', (_, res) => {
  res.send('<a href="/auth/login">login</a>');
});

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  res.render('dashboard', {
    user: req.user,
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

router.get('/admin', ensureAuthenticated, async (req, res) => {
  if (req.user?.role === 'user') res.sendStatus(404);
  console.log(await getAllSessions(req));
  res.render('dashboard', {
    user: req.user,
    sessions: await getAllSessions(req),
  });
});

router.post(
  '/dashboard/session/delete/:sessionID',
  ensureAuthenticated,
  async (req, res) => {
    const sessionID = req.params.sessionID;
    if (req.sessionStore.destroy === undefined)
      throw new Error('no session store');
    try {
      await promisify(req.sessionStore.destroy)(sessionID);
      res.redirect('/dashboard');
    } catch (e) {
      res.send('sessionID does not exist');
    }
  }
);

export default router;
