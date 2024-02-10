"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
const userController_1 = require("../../controllers/userController");
const userModel_1 = require("../../models/userModel");
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
if (clientID === undefined || clientSecret === undefined)
    throw new Error('Missing env variables clientID or clientSecret');
const githubStrategy = new passport_github2_1.Strategy({
    clientID,
    clientSecret,
    callbackURL: '/auth/github/callback',
    passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userModel_1.database.findById(profile.id);
    if (user)
        return done(null, user);
    const newGithubUser = new userModel_1.GithubUser(parseInt(profile.id), profile.displayName);
    userModel_1.database.addUser(newGithubUser);
    return done(null, newGithubUser);
}));
passport_1.default.serializeUser((user, done) => {
    const foundUser = userModel_1.database.findById(user.id);
    if (foundUser === null)
        return done({ message: 'user not found' }, null);
    done(null, foundUser);
});
passport_1.default.deserializeUser((id, done) => {
    let user = (0, userController_1.getUserById)(id);
    if (user) {
        done(null, user);
    }
    else {
        done({ message: 'User not found' }, null);
    }
});
const passportGitHubStrategy = {
    name: 'github',
    strategy: githubStrategy,
};
exports.default = passportGitHubStrategy;
