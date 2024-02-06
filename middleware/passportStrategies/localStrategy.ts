import passport from 'passport';
import { type UserModel } from '../../models/userModel';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from '../../controllers/userController';
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    const userOrError = getUserByEmailIdAndPassword(email, password);
    return typeof userOrError !== 'string'
      ? done(null, userOrError)
      : done(null, false, {
        message: userOrError as string,
      });
  }
);

// add to types.d.ts
declare global {
  namespace Express {
    interface User extends UserModel { }
  }
}

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: 'User not found' }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
