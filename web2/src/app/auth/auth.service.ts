import { HttpClient } from '@angular/common/http';
import { User, IUser } from './user.model';
import { UsersService } from './../users/users.service';

import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/'
import * as firebase from 'firebase/app';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthService {

  // public user: firebase.User;
  // public dbUser: User;
  // public authState$: Observable<firebase.User>;

  private webAuth: any;
  
  public authenticated$: Observable<boolean>;
  public authenticated: boolean;

  private _authInfo: any;
  
  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private http: HttpClient
  ) {

    this.authenticated = false;

    this.webAuth = new auth0.WebAuth({
      domain: 'apedley.auth0.com',
      clientID: 'aIZSm1MqO8NzINvT1LAYpBmIVvtHPyS2'
    });
    // this.user = null;
    // this.authState$ = afAuth.authState;

    // this.authState$.subscribe((user: firebase.User) => {
    //     this.user = user;

    //     console.log('authState$ changed', this.user);
    //     const url = 'http://localhost:8080/users/' + encodeURIComponent(user.email);

    //     this.http.get<IUser>(url).subscribe(
    //     results => {
    //       this.dbUser = results
    //     }, error => {
    //       this.dbUser = null;
    //       console.error('error at getting user from db when already logged in', error);
    //     })
    // });
  }

  logInEmail(email: string, password: string) {
    this.webAuth.client.login({
        username: email,
        password: password,
        // audience: 'https://api.feeed.andrewpedley.com',
        realm: 'Username-Password-Authentication'
      }, (err, authResult) => {
        // Auth tokens in the result or an error
        debugger;
        this.authenticated = true;

        this.router.navigate(['/']);
      });
    // return firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     debugger;
    //     const authId = result.uid;
        
    //     this.user = result.user;
        
    //     const url = 'http://localhost:8080/users/' + encodeURIComponent(email);

    //     this.http.get<IUser>(url).subscribe(results => {
    //       this.dbUser = results
    //       this.router.navigate(['/']);
    //     })
    //   }).catch((error: firebase.FirebaseError) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;

    //     console.error('ERROR @ AuthService#signIn() :', error);
    // });

  }


  signUpEmail(email: string, password: string) {
    this.webAuth.signup({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, (err) => {
      debugger;
    })
    // return firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then(authResults => {
    //     const authId = authResults.uid;
    //     this.http.post('http://localhost:8080/users', {email, authId}).subscribe(results => {
    //       this.dbUser = results['user'];

    //       this.router.navigate(['/']);
    //     });
    //   })
    //   .catch(err => {
    //     console.error('Error: ', err);
    //   });
  }

  logout(): void {
    // this.dbUser = null;
    // this.afAuth.auth.signOut();
    // this.router.navigate(['/login']);
  }

}
