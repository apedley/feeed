import { environment } from './../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, IUser } from './user.model';

import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, ReplaySubject, Subject } from 'rxjs/Rx';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  public user: User;
  userSubscription = new ReplaySubject<IUser>(1);

  public user$: Observable<any> = null;
  public token: string;


  constructor (
    public router: Router,
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {

    this.user = null;

    this.updateUser();
  }

  updateUser() {
    this.user$ = null;
    this.afAuth.authState.subscribe( token => {
      if (token) {
        firebase.auth().currentUser.getIdToken()
          .then(apiToken => {
            this.token = apiToken;
            this.user$ = this.http.get(`${environment.apiBaseUrl}/users/current`, {
              headers: new HttpHeaders().set('Authorization', `bearer ${apiToken}`)  
            }).share();
            this.user$.subscribe(user => {
              this.userSubscription.next(user);
            });
          });
        
      }
    })
  }
  
  // currentUser() {
  //   debugger;
  //   if (this.user != null) {
  //     return Observable.of(this.user);
  //   }

  //   this.afAuth.authState.subscribe( token => {
  //     if (token) {
        
  //       firebase.auth().currentUser.getIdToken()
  //         .then(apiToken => {
  //           return this.http.get<IUser>(`${environment.apiBaseUrl}/users/current`, {
  //             headers: new HttpHeaders().set('Authorization', `bearer ${apiToken}`)  
  //           }).do(user => {
  //             debugger;
  //             this.user = user;
  //           }).publishReplay(1)
  //           .refCount();
  //         })
  //     }
  //   })
  // }

  logInEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signUpEmailFirebase(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  createUser(authResults) {
    firebase.auth().currentUser.getIdToken()
      .then(token => {

        
        const userData = {
          email: authResults.email,
          authId: authResults.uid,
          firebaseToken: token
        }

        this.http.post(`${environment.apiBaseUrl}/users`, userData).subscribe(results => {
          
          this.user = results['user'];

          this.router.navigate(['/']);
        });

      });
  }

  logout(): void {
    this.afAuth.auth.signOut();
    this.user = null;
    this.userSubscription.next(null);
    this.router.navigate(['/login'])
  }
  
}