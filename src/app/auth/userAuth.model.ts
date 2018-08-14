class IUserAuth {
  email: string;
  password: string;
}

class UserAuth {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export { UserAuth, IUserAuth };
