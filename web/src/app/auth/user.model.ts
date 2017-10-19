
import {ISubscription} from '../news/subscription.model';


export interface IUser {
  authId: string;
  email: string;
  language: string;
  firebaseToken: string;
  subscriptions?: [ISubscription]
}


export class User implements IUser {
  constructor(
    public email: string,
    public authId: string,
    public firebaseToken: string,
    public language: string = 'en'
  ) {

  }
}