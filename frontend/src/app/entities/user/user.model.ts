export interface IUser {
  id : number;
  username : string;
  password : string;
  email_address : string;
  email_password : string;
  smtp_server : string;
  smtp_port : number;
  imap_server : string;
}

export type NewUser = Omit<IUser, 'id'> & {id: null};