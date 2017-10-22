import { UIService } from '../../shared/ui.service';
import { AuthService } from './../../auth/auth.service';

import { ISource } from './../source.model';
import { Source } from '../source.model';
import { NewsService } from './../news.service';
import { Article } from './../article.model';
import { Subscription as AppSubscription } from '../subscription.model';
import { Subscription } from 'rxjs/Rx';
import { ISubscription } from '../../news/subscription.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.css']
})
export class SourceListComponent implements OnInit, OnDestroy {

  public sources: ISource[] = [];
  private sourcesSubscription: Subscription;

  public subscriptions: ISubscription[] = [];

  public availableSubscriptions: ISource[] = [];
  public searchString = '';

  public selectedCategory = null;
  public categories = {
    general: 'General',
    sport: 'Sports',
    business: 'Business',
    politics: 'Politics',
    entertainment: 'Entertainment',
    technology: 'Technology',
    'health-and-medical': 'Health And Medical',
    'science-and-nature': 'Science And Nature',
    gaming: 'Gaming'
  }
  constructor(private newsService: NewsService, private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    this.uiService.setTitle('Sources');
    this.sourcesSubscription = this.newsService.sourcesSubscription.subscribe(sources => {
      this.sources = sources;
      this.updateSources(this.sources, this.subscriptions);
    });
    this.newsService.getSources();

    this.authService.userSubscription.subscribe(user => {
      if (!user) {
        return this.subscriptions = []; 
      }
      this.subscriptions = user.subscriptions;
      this.updateSources(this.sources, this.subscriptions);
    });

  }

  ngOnDestroy() {
    this.sourcesSubscription.unsubscribe();
  }

  search($event) {
    this.searchString = $event.target.value;
  }

  categoryChanged(value) {
    this.selectedCategory = value === 'Category' ? null : value;
  }
  subscribeClicked(source) {
    this.newsService.addSubscription(source).subscribe(
      response => {
        
        this.subscriptions.push(response);
        this.updateSources(this.sources, this.subscriptions);
      },
      err => {
        console.error(err)
      })
  }

  unSubscribeClicked(subscription) {
    this.newsService.removeSubscription(subscription).subscribe(
      response => {
        if (response['status'] !== 'ok') {
          return console.error('error: ', response);
        }

        this.subscriptions = this.subscriptions.filter(sub => {
          return sub.sourceId !== subscription.sourceId;
        });

        this.updateSources(this.sources, this.subscriptions);
      },
      err => {
        console.dir(err);
      });
    
  }

  updateSources(sources, subscriptions) {
    if (sources.length === 0 || subscriptions.length === 0) {
      return sources;
    }

    this.availableSubscriptions = sources.filter(source => {
      let subscribed = false;

      subscriptions.forEach(subscription => {
        if (source.id === subscription.sourceId) {
          subscribed = true;
        }
      });

      return !subscribed;
    });
  }
}
