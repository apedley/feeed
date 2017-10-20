import { SidebarService } from './../shared/sidebar/sidebar.service';
import { MatSidenav } from '@angular/material';
import { Article } from './../news/article.model';
import { Subscription } from 'rxjs/Rx';
import { NewsService } from './../news/news.service';
import { Subscription as AppSubscription } from '../news/subscription.model';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

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

  public isMobileView = false;
  public subscriptionMedia: Subscription;

  private sidebarSubscription: Subscription;
  @ViewChild('sidenav') sidenav: MatSidenav;


  constructor(private newsService: NewsService, public media: ObservableMedia, private sidebarService: SidebarService) { }

  ngOnInit() {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');      
    })
    
    this.selectedSubscriptionSubscription = this.newsService.selectedSubscriptionChanged.subscribe(sub => {
      this.selectedSubscription = sub;
    });

    this.articlesSubscription = this.newsService.articlesChanged.subscribe(articles => {
      this.articles = articles;
    });

    this.sidebarSubscription = this.sidebarService.openChanged.subscribe(status => {
      if (status) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    })
  }

  ngOnDestroy() {
    this.selectedSubscriptionSubscription.unsubscribe();
  }

  articleClicked(article: Article) {
    window.open(article.url, '_blank');
    
  }

  toggleMenu() {
    this.sidenav.open();
  }
}
