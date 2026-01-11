export interface IMail {
  id : number;
  email_from : string;
  email_to : string;
  subject : string;
  content : string;
  date : string;
  seen : boolean;
  answered : boolean;
  flagged : boolean;
  draft : boolean;
}

export type NewMail = Omit<IMail, "id">;

export class MailClass implements Omit<IMail, "id"> {
  constructor(
    public email_from : string,
    public email_to : string,
    public subject : string,
    public content : string,
    public date : string,
    public seen : boolean,
    public answered : boolean,
    public flagged : boolean,
    public draft : boolean,
  ) {}
}