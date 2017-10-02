import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { IUser, User } from '../auth/user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  private currentUser: User;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  addUser(user: User) {

  }
  
  getByEmail(email) {
    this.http.get<IUser>('http://localhost:8080/users/' + encodeURIComponent(email)).subscribe(results => {
      this.currentUser = results;
      debugger;
      this.router.navigate(['/']);
    })
  }

  create(data) {
    this.http.post('http://localhost:8080/users', data).subscribe(results => {
      debugger;
      this.currentUser = results['user'];

      this.router.navigate(['/']);
    })
      // .map(
      //   (response: Response) => {
      //     debugger;
      //   }
      // )
      
  }
}
// import { IUser, User } from './user.model';
// import { Observable } from 'rxjs/Observable';
// import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable,  } from 'angularfire2/database';

// import 'rxjs/add/observable/merge';
// import 'rxjs/add/operator/switchMap';

// import { AuthService } from './../auth/auth.service';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class UsersService {
//   private appUser$: FirebaseObjectObservable<any>;

//   constructor(private auth: AuthService, private db: AngularFireDatabase) {
//     auth.authState$.take(1).subscribe(authState => {
//       const path = `/appUsers/${authState.uid}`;

//       console.log('path', path);

//       this.appUser$ = db.object(path);

//       this.appUser$.subscribe(val => {
//         console.log('new val: ', val);
//       });
//     });
//   }

//   addUser(user: User) {
//     const empty = this.appUser$.isEmpty();
//   }
// }