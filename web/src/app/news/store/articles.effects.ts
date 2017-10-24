import { IArticleResponse } from './../article.model';
import { environment } from './../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';
import * as ArticlesActions from './articles.actions';
import * as firebase from 'firebase';
import * as fromArticles from './articles.reducer';


@Injectable()
export class ArticlesEffects {
  @Effect()
  getTopArtices = this.actions$
    .ofType(ArticlesActions.FETCH_TOP_ARTICLES)
    .switchMap((action: ArticlesActions.FetchTopArticles) => {
      const body = {   
        url: 'http://beta.newsapi.org/v2/top-headlines?language=en&',
        limit: 25
      };
      const localUrl = `${environment.apiBaseUrl}/news/request`;


      return this.httpClient.post<IArticleResponse>(localUrl, body, {
        headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
      });
    }).map((articlesResponse: IArticleResponse) => {
      return {
        type: ArticlesActions.SAVE_ARTICLES,
        payload: articlesResponse.articles
      }
    });
  

  constructor(private actions$: Actions, 
    private httpClient: HttpClient, 
    private store: Store<fromArticles.ArticlesState>, 
    private authService: AuthService) { }

}