import { AuthService } from '../auth.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { matchOtherValidator } from '../../shared/match-other-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formLoading = false;
  signupForm: FormGroup;
  error = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._initForm();
  }

  onSignUpFormSubmit() {
    const email = this.signupForm.value.email as string;
    const password = this.signupForm.value.password as string;  
    
    this.formLoading = true;
    this.authService.signUpEmailFirebase(email, password)
    .then(authResults => {
      this.authService.createUser(authResults);
    })
    .catch(err => {
      this.error = err.message;
      this.formLoading = false;
    })
  }

  private _initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, matchOtherValidator('password')]]
    });
  }
}
