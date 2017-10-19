import { Article } from './../news/article.model';
import { Subscription } from 'rxjs/Rx';
import { NewsService } from './../news/news.service';
import { Subscription as AppSubscription } from '../news/subscription.model';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private selectedSubscriptionSubscription: Subscription;
  public selectedSubscription: AppSubscription;

  private articlesSubscription: Subscription;
  public articles: Article[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit() {

    this.selectedSubscriptionSubscription = this.newsService.selectedSubscriptionChanged.subscribe(sub => {
      this.selectedSubscription = sub;
    });

    this.articlesSubscription = this.newsService.articlesChanged.subscribe(articles => {
      this.articles = articles;
    });
  }

  ngOnDestroy() {
    this.selectedSubscriptionSubscription.unsubscribe();
  }

  articleClicked(article: Article) {
    window.open(article.url, '_blank');
    
  }
}