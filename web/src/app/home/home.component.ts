import { UIService } from '../shared/ui.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';

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
  private articlesSubscription: Subscription;
  public articles: Article[] = [];

  private sidebarSubscription: Subscription;
  
  private id: any;
  
  public title = '';

  constructor(
    private newsService: NewsService, 
    public media: ObservableMedia, 
    private route: ActivatedRoute, 
    private router: Router, 
    private uiService: UIService) { }

  ngOnInit() {

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

    this.articlesSubscription = this.newsService.articlesChanged.subscribe(articles => {
      this.articles = articles;
    });
  } 

  ngOnDestroy() {
    this.articlesSubscription.unsubscribe();
  }


}
