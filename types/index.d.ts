declare global {
  namespace Express {
    interface User extends UserModel { }
  }
}
