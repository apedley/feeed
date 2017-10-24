import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { UIService } from '../../shared/ui.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

import { Article } from '../../news/article.model';
import { Subscription } from 'rxjs/Rx';
import { NewsService } from '../../news/news.service';
import { ISubscription, Subscription as AppSubscription } from '../../news/subscription.model';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as fromArticles from '../../news/store/articles.reducer';
import * as ArticlesActions from '../../news/store/articles.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private articlesSubscription: Subscription;
  public articles: Article[] = [];
  public subscriptions: ISubscription[] = [];
  private userSubscription: Subscription;
  public title = '';

  constructor(
    private newsService: NewsService, 
    private authService: AuthService,
    public media: ObservableMedia, 
    private route: ActivatedRoute, 
    private router: Router, 
    private uiService: UIService,
    private store: Store<fromArticles.ArticlesState>) { }

  ngOnInit() {

    this.store.dispatch(new ArticlesActions.FetchTopArticles());
    
    
    this.uiService.titleSubscription.subscribe(title => {
      this.title = title;
    })

    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.newsService.getArticles(params['id']);
        const source = this.newsService.getSource(params['id']);
        source.subscribe(foundSource => {
          this.uiService.setTitle(foundSource.name);
        })
      } else {
        this.newsService.getArticles();
        this.uiService.setTitle('Top Stories');
      }
    });

    this.userSubscription = this.authService.userSubscription.subscribe(user => {
      if (!user || !user.subscriptions) {
        return this.subscriptions = [];
      }
      this.subscriptions = user.subscriptions;
    })

    this.articlesSubscription = this.newsService.articlesChanged.subscribe(articles => {
      this.articles = articles;
    });

    
  } 

  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onSearch(searchString: string) {
    this.newsService.searchArticles(searchString);
  }

}
