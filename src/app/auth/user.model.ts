interface IUser {
  email: string;
  userId: string;
}

class User {
  email: string;
  userId: string;

  constructor(email: string, userId: string) {
    this.email = email;
    this.userId = userId;
  }
}

export { User, IUser };
