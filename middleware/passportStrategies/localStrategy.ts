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
    const user = getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
        message: 'Your login details are not valid. Please try again',
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
