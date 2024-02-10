type Role = 'user' | 'admin';

export class User {
  private _id: number;
  private _role: Role;

  constructor(id: number, role: Role = 'user') {
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

export class LocalUser extends User {
  private _password: string;
  private _name: string;
  private _email: string;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    role: Role = 'user'
  ) {
    super(id, role);
    this._password = password;
    this._name = name;
    this._email = email;
  }

  authenticate(password: string) {
    return this._password === password;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }
}

export class GithubUser extends User {
  private _name: string;

  constructor(id: number, name: string, role: Role = 'user') {
    super(id, role);
    this._name = name;
  }

  get name() {
    return this._name;
  }
}

class Database {
  private _users: User[];

  constructor(users: User[]) {
    this._users = users;
  }

  get users() {
    return this._users;
  }

  findOneByEmail(email: string): LocalUser | null {
    const user = this._users.find((user) => {
      if (user instanceof LocalUser) {
        return user.email === email;
      }
    });
    if (user) return user as LocalUser;
    return null;
  }

  findById(id: number) {
    const user = this._users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return null;
  }

  addUser(user: User) {
    this._users.push(user);
    console.log(this._users);
  }
}

export const database: Database = new Database([
  new LocalUser(1, 'Jimmy Smith', 'jimmy123@gmail.com', 'jimmy123!', 'admin'),
  new LocalUser(2, 'Johnny Doe', 'johnny123@gmail.com', 'johnny123!'),
  new LocalUser(3, 'Jonathan Chen', 'jonathan123@gmail.com', 'jonathan123!'),
]);
