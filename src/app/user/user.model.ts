interface IUser {
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
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
