
import { UIService } from './shared/ui.service';
import { ObjectKeysPipe } from './news/source-list/object-keys.pipe';
import { SourceFilterPipe } from './news/source-list/source-filter.pipe';
import { ArticleListItemComponent } from './news/article-list/article-list-item.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewsService } from './news/news.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UnauthGuard } from './auth/unauth-guard.service';
import { AuthGuard } from './auth/auth-guard.service';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { environment } from '@env/environment';
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
    SourceListComponent,
    ArticleListComponent,
    ArticleListItemComponent,
    SourceFilterPipe,
    ObjectKeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.secret.fireBaseInfo),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ClarityModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UnauthGuard,
    NewsService,
    Title,
    UIService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }

