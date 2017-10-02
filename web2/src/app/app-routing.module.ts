import { UnauthGuard } from './auth/unauth-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { NewsComponent } from './news/news.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const appRoutes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'signup', component: SignupComponent, canActivate: [UnauthGuard] },
  // { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsComponent }

  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
