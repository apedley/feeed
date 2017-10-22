import { environment } from './../../environments/environment';
import { Source, ISource, ISourcesResponse } from './source.model';

import { IArticle, IArticleResponse } from './article.model';
import { Observable, ReplaySubject, Subject } from 'rxjs/Rx';
import { ISubscription, Subscription } from './subscription.model';
import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsService {

  private selectedSubscription: Subscription = null;
  selectedSubscriptionChanged = new Subject<Subscription>();

  private sources: Source[] = [];
  sourcesSubscription = new ReplaySubject<Source[]>();

  private articles: IArticle[] = [];
  articlesChanged = new Subject<IArticle[]>();

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) { }

  
  getArticles(sourceId?) {
    let url = 'http://beta.newsapi.org/v2/top-headlines?language=en&';
    if (sourceId) {
      url = `http://beta.newsapi.org/v2/top-headlines?sources=${sourceId}&`;
    }
    const body = {   
      url,
      limit: 25
    };
    const localUrl = `${environment.apiBaseUrl}/news/request`;
    return this.http.post<IArticleResponse>(localUrl, body, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
    }).subscribe(response => {
      if (response.status !== 'ok' || !response.articles) {
        return console.dir(response);
      }
      this.articles = response.articles;
      this.articlesChanged.next(this.articles.slice());
    })
  }

  getSources() {
    if (this.sources.length < 1) {
      this._fetchSources().subscribe(response => {
        this.sources = response.sources;
        this.sourcesSubscription.next(this.sources.slice());
      })
    }
  }

  getSource(id) {
    if (this.sources.length < 1) {
      this._fetchSources().subscribe(response => {
        this.sources = response.sources;
        this.sourcesSubscription.next(this.sources.slice());
      })
    }
    return this.sourcesSubscription.map(sources => sources.filter(source => source.id === id)[0]);
  }

  private _fetchSources() {
    const body = {
      url: `http://beta.newsapi.org/v2/sources?language=en&`
    }
    const url = `${environment.apiBaseUrl}/news/request`;
    
    return this.http.post<ISourcesResponse>(url, body, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
    })
  }

  searchSources(text: string): ISource[] {
    if (this.sources.length === 0) {
      this.getSources();
      return []
    }
    
    const sources = this.sources.filter(source => {
      if (source.name.toLowerCase().search(text) > -1 ) {
        return true;
      }
      return false;
    })

    return sources;
  }
  searchArticles(searchString: string) {
    const body = {
      url: `http://beta.newsapi.org/v2/everything?q=${searchString}&`
    };

    const url = `${environment.apiBaseUrl}/news/request`;
    this.http.post<IArticleResponse>(url, body, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
    }).subscribe(articlesResponse => {
      this.articles = articlesResponse.articles;
      this.articlesChanged.next(this.articles);
    });
  }

  addSubscription(source: ISource) {
    const url = `${environment.apiBaseUrl}/users/subscribe`;

    const data = {
      ...source,
      sourceId: source.id
    };

    delete data.id;
    return this.http.post<ISubscription>(url, data, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
    })

  }

  removeSubscription(subscription: ISubscription) {
    const url = `${environment.apiBaseUrl}/users/unsubscribe`;

    return this.http.post(url, subscription, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)
    });
  }
}