import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formLoading = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSignUpFormSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;  
    
    this.formLoading = true;
    this.authService.signUpEmail(email, password);
  }
}
