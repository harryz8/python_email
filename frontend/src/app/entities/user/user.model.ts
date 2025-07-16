export interface IUser {
  id : number;
  username : string;
  password : string;
}

export type NewUser = Omit<IUser, 'id'> & {id: null};