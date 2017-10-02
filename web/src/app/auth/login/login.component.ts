import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  .auth-form-space-margin {
    margin: 10%;
  }
  `]
})
export class LoginComponent implements OnInit {
  formLoading = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLoginFormSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.formLoading = true;
    
    this.authService.logInEmail(email, password);
  } 
}
