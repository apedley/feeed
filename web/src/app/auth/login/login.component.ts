import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLoading = false;
  loginForm: FormGroup;
  error = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this._initForm();
  }

  onLoginFormSubmit() {
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;
    this.formLoading = true;
    
    this.authService.logInEmail(email, password)
      .then(result => {
        this.router.navigate(['/'])
      }).catch(err => {
        this.error = 'Incorrect username or password';
        this.formLoading = true;
      })
  }

  private _initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
