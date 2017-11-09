import { ReplaySubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class UIService {
  private title;
  titleSubscription = new ReplaySubject<string>(1);

  constructor(private titleService: Title) {}

  setTitle(title) {
    this.title = title;
    this.titleSubscription.next(title);
    this.titleService.setTitle(`feeed - ${title}`)
  }
}
