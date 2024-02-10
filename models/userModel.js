"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.GithubUser = exports.LocalUser = exports.User = void 0;
class User {
    constructor(id, role = 'user') {
        this._id = id;
        this._role = role;
    }
    get id() {
        return this._id;
    }
    get role() {
        return this._role;
    }
}
exports.User = User;
class LocalUser extends User {
    constructor(id, name, email, password, role = 'user') {
        super(id, role);
        this._password = password;
        this._name = name;
        this._email = email;
    }
    authenticate(password) {
        return this._password === password;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
}
exports.LocalUser = LocalUser;
class GithubUser extends User {
    constructor(id, name, role = 'user') {
        super(id, role);
        this._name = name;
    }
    get name() {
        return this._name;
    }
}
exports.GithubUser = GithubUser;
class Database {
    constructor(users) {
        this._users = users;
    }
    get users() {
        return this._users;
    }
    findOneByEmail(email) {
        const user = this._users.find((user) => {
            if (user instanceof LocalUser) {
                return user.email === email;
            }
        });
        if (user)
            return user;
        return null;
    }
    findById(id) {
        const user = this._users.find((user) => user.id === id);
        if (user) {
            return user;
        }
        return null;
    }
    addUser(user) {
        this._users.push(user);
        console.log(this._users);
    }
}
exports.database = new Database([
    new LocalUser(1, 'Jimmy Smith', 'jimmy123@gmail.com', 'jimmy123!', 'admin'),
    new LocalUser(2, 'Johnny Doe', 'johnny123@gmail.com', 'johnny123!'),
    new LocalUser(3, 'Jonathan Chen', 'jonathan123@gmail.com', 'jonathan123!'),
]);
