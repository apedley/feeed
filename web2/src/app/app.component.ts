import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  
  
  ngOnInit() {
  }
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    // this.items = af.list('/messages', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });


  }


}
