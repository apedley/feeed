import { ArticlesEffects } from './news/store/articles.effects';
import { articlesReducer } from './news/store/articles.reducer';
import { SourcesEffects } from './news/store/sources.effects';
import { sourcesReducer } from './news/store/sources.reducer';

import { AuthModule } from './auth/auth.module';

import { UIService } from './shared/ui.service';
import { ObjectKeysPipe } from './news/source-list/object-keys.pipe';
import { SourceFilterPipe } from './news/source-list/source-filter.pipe';
import { ArticleListItemComponent } from './news/article-list/article-list-item.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewsService } from './news/news.service';
import { HttpClientModule } from '@angular/common/http';

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
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer.component';

import { environment } from '@env/environment';
import { SourceListComponent } from './news/source-list/source-list.component';
import { ArticleListComponent } from './news/article-list/article-list.component';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


// const firebaseConfig = ;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SourceListComponent,
    ArticleListComponent,
    ArticleListItemComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    SourceFilterPipe,
    ObjectKeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.secret.fireBaseInfo),
    AngularFireAuthModule,
    ClarityModule.forRoot(),
    AuthModule,
    HttpModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot( { sources: sourcesReducer, articles: articlesReducer }),
    EffectsModule.forRoot([SourcesEffects, ArticlesEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
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

