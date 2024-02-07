import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { type Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';

const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

if (clientID === undefined || clientSecret === undefined)
  throw new Error('Missing env variables clientID or clientSecret');

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID,
    clientSecret,
    callbackURL: '',
    passReqToCallback: true,
  },

  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) => { }
);

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
