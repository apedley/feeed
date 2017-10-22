import { AuthService } from './../../auth/auth.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { NewsService } from './../news.service';
import { IArticle } from './../article.model';
import { Subscription as AppSubscription } from '../subscription.model';
import { Subscription } from 'rxjs/Rx';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  private selectedSubscriptionSubscription: Subscription;
  public selectedSubscription: AppSubscription;

  // private articlesSubscription: Subscription;
  // public articles: IArticle[] = [];
  
  constructor(private newsService: NewsService, public media: ObservableMedia, private authService: AuthService) { }

  private mediaSubscription: Subscription;

  public cardColumns = 3;

  public user: any;

  @Input() articles: IArticle[];
  ngOnInit() {

    this.updateCardColumnCount();

    this.mediaSubscription = this.media.subscribe( (change: MediaChange) => {
      this.updateCardColumnCount();
    })

  }

  ngOnDestroy() {
  }

  articleClicked(article: IArticle) {
    window.open(article.url, '_blank');
    
  }

  updateCardColumnCount() {
    if (this.media.isActive('xs')) {
      this.cardColumns = 1;
    } else if (this.media.isActive('sm')) {
      this.cardColumns = 2;
    } else if (this.media.isActive('xl') || this.media.isActive('lg')) {
      this.cardColumns = 4;
    } else {
      this.cardColumns = 3;
    }
  }

}
