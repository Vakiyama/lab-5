import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';
import passportMiddleware from './middleware/passportMiddleware';
import 'dotenv/config';

const port = process.env.port || 3000;

const app = express();

declare module 'express-session' {
  interface SessionData {
    messages: string[];
    sessions: { [sid: string]: string };
  }
}

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import authRoute from './routes/authRoute';
import indexRoute from './routes/indexRoute';

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

// app.use((req, res, next) => {
//   next();
// });

app.use('/', indexRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
