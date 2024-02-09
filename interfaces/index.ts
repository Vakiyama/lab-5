import { Strategy } from 'passport';

export interface PassportStrategy {
  name: string;
  strategy: Strategy;
}

export interface GithubStrategy {
  name: string;
  strategy: Strategy;
}
