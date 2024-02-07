export type IUser = {
  id: number;
  name: string;
};

type LocalUser = {
  email: string;
  password?: string;
} & IUser;

type GithubUser = {
  email: string;
  password?: never;
} & IUser;

export type UserModel = GithubUser | LocalUser;

const database: UserModel[] = [
  {
    id: 1,
    name: 'Jimmy Smith',
    email: 'jimmy123@gmail.com',
    password: 'jimmy123!',
  },
  {
    id: 2,
    name: 'Johnny Doe',
    email: 'johnny123@gmail.com',
    password: 'johnny123!',
  },
  {
    id: 3,
    name: 'Jonathan Chen',
    email: 'jonathan123@gmail.com',

    password: 'jonathan123!',
  },
];

const userModel = {
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
  },
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return null;
  },
  create: (user: UserModel) => { },
  findOrCreate: (id: number) => {
    const user = userModel.findById(id);
    if (user) return user;
    // create
  },
};

export { database, userModel };
