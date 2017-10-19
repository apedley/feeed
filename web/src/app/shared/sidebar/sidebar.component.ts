
import { ISource } from './../../news/source.model';
import { NewsService } from '../../news/news.service';
import { IUser } from './../../auth/user.model';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from '../../news/subscription.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  profile: any;
  subscriptions: ISubscription[];
  user: IUser;
  
  searchResults: ISource[] = [];

  constructor(private authService: AuthService, private newsService: NewsService) { }

  ngOnInit() {
    this.authService.userSubscription.subscribe(user => {
      this.subscriptions = user.subscriptions;
    })
  }

  subscriptionClicked(subscription) {
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
