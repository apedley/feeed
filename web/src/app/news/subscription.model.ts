import { IUser } from './../auth/user.model';

// export class User implements IUser {
//   constructor(
//     public name: string,
//     public email: string,
//     public language: string = 'en'
//   ) {
    
//   }
// }


export interface ISubscription {
  sourceId: string;
  name: string;
  description?: string;
  url?: string;
  country?: string;
  language?: string;
  category?: string;
  user: IUser;
  active?: boolean;
}


export class Subscription implements ISubscription {
  constructor(
    public sourceId: string,
    public name: string,
    public user: IUser,
    public description: string = '',
    public url: string = '',
    public country: string = '',
    public language: string = '',
    public category: string = ''
  ) {
  }
}