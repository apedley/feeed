import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
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
  constructor() {

  }


}
