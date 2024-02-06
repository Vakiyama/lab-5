import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { type Request } from 'express';
import { VerifyCallback } from 'passport-oauth2';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: '',
    clientSecret: '',
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
