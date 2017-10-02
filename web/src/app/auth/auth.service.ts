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


@Injectable()
export class AuthService {

  public user: firebase.User;
  public dbUser: User;
  public authState$: Observable<firebase.User>;

  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private http: HttpClient
  ) {
    this.user = null;
    this.authState$ = afAuth.authState;
    this.afAuth.authState.subscribe((res) => {
      console.log('newsub', res);
    })
    this.authState$.subscribe((user: firebase.User) => {
        this.user = user;
        
        console.log('authState$ changed', this.user);
        debugger;
        const url = 'http://localhost:8080/users/' + encodeURIComponent(user.email);

        this.http.get<IUser>(url).subscribe(
        results => {
          this.dbUser = results
        }, error => {
          this.dbUser = null;
          console.error('error at getting user from db when already logged in', error);
        })
    });
  }

  logInEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        const authId = result.uid;
        console.log(result);
        // this.user = result.user;
        // debugger;
        // firebase.auth().currentUser.getToken()
        // .then(token => {
          
        //   debugger;
        //   // const url = 'http://localhost:8080/users/' + encodeURIComponent(email);
        //   const url = 'http://localhost:8080/users/login';
        //   this.http.post<IUser>(url, {email, token}).subscribe(results => {
        //     this.dbUser = results
        //     this.router.navigate(['/']);
        //   })
        // })

        // .catch(err => {
        //   console.error('error getting token');
        // });
        
        

      }).catch((error: firebase.FirebaseError) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error('ERROR @ AuthService#signIn() :', error);
      });

  }


  signUpEmail(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(authResults => {
        const authId = authResults.uid;
        debugger;
        this.http.post('http://localhost:8080/users', {email, authId}).subscribe(results => {
          this.dbUser = results['user'];

          this.router.navigate(['/']);
        });
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  logout(): void {
    this.dbUser = null;
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
