import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users/users.service';

import { UnauthGuard } from './auth/unauth-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { environment } from '../environments/environment';
import { NewsComponent } from './news/news.component';

// const firebaseConfig = ;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.secret.fireBaseInfo),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UnauthGuard,
    UsersService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

