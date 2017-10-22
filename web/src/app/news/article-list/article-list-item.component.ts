
import { IArticle } from './../article.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-article-list-item',
  template: `
  <div class="card clickable app-article-card">
  <div class="card-img" (click)="articleClicked(article)">
    <img class="app-article-card-img" *ngIf="article.urlToImage" [src]="article.urlToImage">
    <img class="app-article-card-img" *ngIf="!article.urlToImage" src="/assets/news.jpg">
  </div>
  <div class="card-block" (click)="articleClicked(article)">
    <div class="card-title">
      {{article.title}}
    </div>
    <div class="card-text">
      {{ article.description }}
    </div>
  </div>
  <div class="card-footer">
    <a class="card-link" [routerLink]="['/news', article.source.id]">{{ article.source.name }}</a>
  </div>
  `,
  styles: [`
    .app-article-card-img {
      max-height: 200px;
      object-fit: cover;
    }
  `]
})
export class ArticleListItemComponent implements OnInit {
  @Input() article: IArticle | null;

  constructor() {}

  ngOnInit() {}

  articleClicked(article) {
    window.open(article.url, '_blank');
  }
}
