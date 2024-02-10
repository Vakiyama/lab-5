"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const checkAuth_1 = require("../middleware/checkAuth");
const router = express_1.default.Router();
router.get('/login', checkAuth_1.forwardAuthenticated, (req, res) => {
    var _a;
    const message = (_a = req.session.messages) === null || _a === void 0 ? void 0 : _a.pop();
    res.render('login', { message: message ? message : '' });
});
const passportConfig = {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureMessage: true,
};
router.post('/login', passport_1.default.authenticate('local', passportConfig));
router.get('/github/callback', passport_1.default.authenticate('github', passportConfig));
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err)
            console.log(err);
    });
    res.redirect('/auth/login');
});
exports.default = router;
