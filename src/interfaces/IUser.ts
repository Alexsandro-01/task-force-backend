export interface ILogin {
  email: string,
  password: string,
}

export interface IUser {
  name: string,
  email: string,
  password: string,
}

export interface IFullUser extends IUser {
  id: string,
  created_at: Date,
}

export interface ILogedUser {
  name: string,
  token: string,
}