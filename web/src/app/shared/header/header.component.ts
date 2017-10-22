import { NewsService } from './../../news/news.service';
import { IUser } from './../../auth/user.model';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile: any;
  loggedIn = false;

  constructor(public authService: AuthService, private newsService: NewsService) { 
    
    this.profile = null;
  }

  ngOnInit() {
    this.authService.userSubscription.subscribe(user => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  searchArticles(searchString) {
    if (searchString.length < 4) { return }
    this.newsService.searchArticles(searchString).subscribe(result => {
      debugger;
    })
    
  }
}
