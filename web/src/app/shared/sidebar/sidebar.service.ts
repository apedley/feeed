import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable()
export class SidebarService {

  private open = true;
  public openChanged = new Subject<Boolean>();

  constructor(
  ){}

  toggle() {
    this.open = !this.open;
    this.openChanged.next(this.open);
  }
}