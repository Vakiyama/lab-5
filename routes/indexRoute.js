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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const checkAuth_1 = require("../middleware/checkAuth");
router.get('/', (_, res) => {
    res.send('<a href="/auth/login">login</a>');
});
router.get('/dashboard', checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('dashboard', {
        user: req.user,
        sessions: null,
    });
}));
function getAllSessions(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (!req.sessionStore.all)
                return reject('no sessions');
            req.sessionStore.all((err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    });
}
function destroySession(sessionID, req) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (req.sessionStore.destroy === undefined)
                return reject('no session store');
            console.log(sessionID);
            req.sessionStore.destroy(sessionID, (err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    });
}
router.get('/admin', checkAuth_1.ensureAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('dashboard', {
        user: req.user,
        sessions: yield getAllSessions(req),
    });
}));
router.post('/admin/revoke/:sessionID', checkAuth_1.ensureAuthenticated, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionID = req.params.sessionID;
    try {
        yield destroySession(sessionID, req);
        res.redirect('/admin');
    }
    catch (e) {
        console.log(e);
        res.send('sessionID does not exist');
    }
}));
exports.default = router;
