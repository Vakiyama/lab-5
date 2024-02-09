import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { type Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';
import { getUserById } from '../../controllers/userController';
import { GithubUser, database } from '../../models/userModel';

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

if (clientID === undefined || clientSecret === undefined)
  throw new Error('Missing env variables clientID or clientSecret');

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: '/auth/github/callback',
    passReqToCallback: true,
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) => {
    const user = database.findById(profile.id);
    if (user) return done(null, user);
    const newGithubUser = new GithubUser(profile.id, profile.displayName);
    database.addUser(newGithubUser);
    return done(null, newGithubUser);
  }
);

passport.serializeUser((user: Express.User, done) => {
  const foundUser = database.findById(user.id);
  if (foundUser === null) return done({ message: 'user not found' }, null);
  done(null, foundUser);
});

passport.deserializeUser((id: number, done) => {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: 'User not found' }, null);
  }
});

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
