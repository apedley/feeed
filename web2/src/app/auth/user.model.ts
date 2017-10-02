
// export class User implements IUser {
//   constructor(
//     public name: string,
//     public email: string,
//     public language: string = 'en'
//   ) {
    
//   }
// }

export interface IUser {
  authId: string;
  email: string;
  language: string;
}


export class User implements IUser {
  constructor(
    public email: string,
    public authId: string,
    public language: string = 'en'
  ) {

  }
}