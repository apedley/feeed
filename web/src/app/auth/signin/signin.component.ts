import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [`

  `]
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSigninFormSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    console.log(email + ' ' + password);
  }
}
