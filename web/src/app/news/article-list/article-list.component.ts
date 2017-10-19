import { NewsService } from './../news.service';
import { Article } from './../article.model';
import { Subscription as AppSubscription } from '../subscription.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
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
