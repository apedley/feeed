
import { ISource } from './../../news/source.model';
import { NewsService } from '../../news/news.service';
import { IUser } from './../../auth/user.model';
import { Observable, Subscription } from 'rxjs/Rx';
import { ISubscription } from '../../news/subscription.model';
import { AuthService } from '../../auth/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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

  searchResults: ISource[] = [];

  @Output() onSearch = new EventEmitter<string>();


  constructor(private authService: AuthService, private newsService: NewsService) { }

  ngOnInit() {
    this.authService.userSubscription.subscribe(user => {
      if (!user) {
        return this.subscriptions = []; 
      }
      this.subscriptions = user.subscriptions;
    });
  }

  searchArticles(value) {
    this.onSearch.emit(value);
  }
  
}
