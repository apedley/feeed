
import { ISource } from './../source.model';
import { Source } from '../source.model';
import { NewsService } from './../news.service';
import { Article } from './../article.model';
import { Subscription as AppSubscription } from '../subscription.model';
import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-source-list',
  templateUrl: './source-list.component.html',
  styleUrls: ['./source-list.component.css']
})
export class SourceListComponent implements OnInit, OnDestroy {

  public sources: ISource[] = [];
  private sourcesSubscription: Subscription;

  public columns: String[] = ['Name', 'Description', 'Category', 'Country'];
  constructor(private newsService: NewsService) { }

  public search: String;

  public direction = -1;
  public key = '';
  ngOnInit() {
    this.sourcesSubscription = this.newsService.sourcesChanged.subscribe(sources => {
      this.sources = sources;
    })
    this.newsService.getSources()
  }

  ngOnDestroy() {
    this.sourcesSubscription.unsubscribe();
  }

  sortColumn(column: string) {
    
    this.direction = this.direction * -1;
    this.key = column;
  }

  searchEntered() {

  }

}
