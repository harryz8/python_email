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