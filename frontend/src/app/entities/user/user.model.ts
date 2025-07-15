export interface IUser {
  id : number;
  username : string;
  _password : string;
}

export type NewUser = Omit<IUser, 'id'> & {id: null};