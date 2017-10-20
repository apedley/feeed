import { SidebarService } from './shared/sidebar/sidebar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewsService } from './news/news.service';
import { HttpClientModule } from '@angular/common/http';

import { UnauthGuard } from './auth/unauth-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './shared/app-material.module';
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
import { SourceListComponent } from './news/source-list/source-list.component';
import { ArticleListComponent } from './news/article-list/article-list.component';

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
    NewsComponent,
    SourceListComponent,
    ArticleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.secret.fireBaseInfo),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UnauthGuard,
    NewsService,
    SidebarService
    
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

