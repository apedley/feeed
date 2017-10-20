import { NewsService } from './../news.service';
import { IArticle } from './../article.model';
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
  public articles: IArticle[] = [];
  
  constructor(private newsService: NewsService) { }
  public imgs = [];

  ngOnInit() {
    
    this.selectedSubscriptionSubscription = this.newsService.selectedSubscriptionChanged.subscribe(sub => {
      this.selectedSubscription = sub;
    });

    this.articlesSubscription = this.newsService.articlesChanged.subscribe(articles => {
      articles.forEach(article => {
        const sizes = [ .70, .85, .95, 1 ];
        const idx = Math.floor(Math.random() * 4);

        article.scale = sizes[idx] * 30 + '';
        if (article.description && article.description.length > 70) {
          article.description = article.description.substr(0, 67).trim() + '...'
        }
      })
      this.articles = articles;
      this.imgs = articles.map(art => { 
        return art.urlToImage; 
      });
    });
  }

  ngOnDestroy() {
    this.selectedSubscriptionSubscription.unsubscribe();
  }

  articleClicked(article: IArticle) {
    window.open(article.url, '_blank');
    
  }

}
