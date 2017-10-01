import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {
  constructor(public authService: AuthService) {
    authService.handleAuthentication();
  }

  ngOnInit() {
  }

}
