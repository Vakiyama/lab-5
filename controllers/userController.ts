import { LocalUser, database } from '../models/userModel';

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = database.findOneByEmail(email);
  if (user) {
    if (isPasswordValid(user, password)) {
      return user;
    }
    return 'Password is invalid.';
  }
  return 'Email not found.';
};

const getUserById = (id: any) => {
  let user = database.findById(id);
  if (user) return user;
  return null;
};

function isPasswordValid(user: LocalUser, password: string) {
  return user.authenticate(password);
}

export { getUserByEmailIdAndPassword, getUserById };
