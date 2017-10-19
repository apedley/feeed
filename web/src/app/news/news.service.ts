import { Source, ISource, ISourcesResponse } from './source.model';

import { Article, IArticleResponse } from './article.model';
import { Subject } from 'rxjs/Rx';
import { Subscription } from './subscription.model';
import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsService {

  private selectedSubscription: Subscription = null;
  selectedSubscriptionChanged = new Subject<Subscription>();
  private sources: Source[] = [];
  sourcesChanged = new Subject<Source[]>();
  private articles: Article[] = [];
  articlesChanged = new Subject<Article[]>();

  constructor(
    public authService: AuthService,
    private http: HttpClient
  ) { }

  selectSubscription(subscription: Subscription) {
    this.selectedSubscription = subscription;
    this.selectedSubscriptionChanged.next(this.selectedSubscription);
    this.getArticles();
  }

  getArticles() {
    if (!this.selectedSubscription) {
      this.articles = [];
      return;
    }

    const body = {
      url: `http://beta.newsapi.org/v2/top-headlines?sources=${this.selectedSubscription.sourceId}&`
    }
    const url = 'http://localhost:8080/news/request';

    

    this.http.post<IArticleResponse>(url, body, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
    }).subscribe(response => {
      this.articles = response.articles;
      this.articlesChanged.next(this.articles.slice());
    })
  }

  getSources() {

    const body = {
      url: `http://beta.newsapi.org/v2/sources?language=en&`
    }
    const url = 'http://localhost:8080/news/request';

    
    this.http.post<ISourcesResponse>(url, body, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
    }).subscribe(response => {
      this.sources = response.sources;
      this.sourcesChanged.next(this.sources.slice());
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

  addSubscription(source: ISource) {
    const url = 'http://localhost:8080/users/subscribe';

    
    const data = {
      ...source,
      sourceId: source.id
    };

    delete data.id;

    this.http.post(url, data, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.authService.token}`)  
    }).subscribe(response => {
      this.authService.updateUser();
    })

  }
}