import { userModel } from '../models/userModel';


const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isPasswordValid(user, password)) {
      return user;
    }
    return "Password is invalid.";
  }
  return "Email not found.";
};
const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isPasswordValid(user: any, password: string) {
  return user.password === password;
}

export { getUserByEmailIdAndPassword, getUserById };
