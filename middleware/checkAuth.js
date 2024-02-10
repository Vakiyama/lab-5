"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardAuthenticated = exports.ensureAdmin = exports.ensureAuthenticated = void 0;
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
};
exports.ensureAuthenticated = ensureAuthenticated;
const ensureAdmin = (req, res, next) => {
    if (!req.isAuthenticated())
        return res.redirect('auth/login');
    if (req.user.role === 'admin')
        return next();
    res.sendStatus(404);
};
exports.ensureAdmin = ensureAdmin;
const forwardAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
};
exports.forwardAuthenticated = forwardAuthenticated;
