
import { ISource } from './../../news/source.model';
import { NewsService } from '../../news/news.service';
import { IUser } from './../../auth/user.model';
import { Observable, Subscription } from 'rxjs/Rx';
import { ISubscription } from '../../news/subscription.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  profile: any;
  subscriptions: ISubscription[];
  user: IUser;

  collapsed = false;
  collapsible = true;

  public isMobileView = false;
  public subscriptionMedia: Subscription;
  @Input() public sideNavRef: MatSidenav;
  
  searchResults: ISource[] = [];

  constructor(private authService: AuthService, private newsService: NewsService, public media: ObservableMedia) { }

  ngOnInit() {
    this.isMobileView = (this.media.isActive('xs') || this.media.isActive('sm'));
    this.subscriptionMedia = this.media.subscribe((change: MediaChange) => {
      this.isMobileView = (change.mqAlias === 'xs' || change.mqAlias === 'sm');      
    })
    this.authService.userSubscription.subscribe(user => {
      this.subscriptions = user.subscriptions;
    })
  }

  subscriptionClicked(event, subscription) {
    this.subscriptions.forEach(sub => {
      
      if (sub.active) {
        
        sub.active = false;
      }
    })
    subscription.active = true;
    this.newsService.selectSubscription(subscription);
  }

  searchSources(value) {
    if (value === '') {
      return this.searchResults = [];
    }
    const results = this.newsService.searchSources(value);

    this.searchResults = results.filter(result => {
      let notSubscribed = true;
      this.subscriptions.forEach(subscription => {

        if (result.id === subscription.sourceId) {
          notSubscribed = false;
        }
      })
      return notSubscribed;
    })
    
  }

  searchResultClicked(result) {
    this.newsService.addSubscription(result);
  }
  
}
