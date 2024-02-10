"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmailIdAndPassword = void 0;
const userModel_1 = require("../models/userModel");
const getUserByEmailIdAndPassword = (email, password) => {
    let user = userModel_1.database.findOneByEmail(email);
    if (user) {
        if (isPasswordValid(user, password)) {
            return user;
        }
        return 'Password is invalid.';
    }
    return 'Email not found.';
};
exports.getUserByEmailIdAndPassword = getUserByEmailIdAndPassword;
const getUserById = (id) => {
    let user = userModel_1.database.findById(id);
    if (user)
        return user;
    return null;
};
exports.getUserById = getUserById;
function isPasswordValid(user, password) {
    return user.authenticate(password);
}
