import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p class="footer-text">
          <a href="https://github.com/apedley/feeed">
          <i class="fa fa-github"></i></a> | 
          Powered by <a href="https://newsapi.org/" target="_blank">NewsAPI.org</a>
        </p>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .footer {
    margin-top: 3em;
  }
  
  .footer-text {
    text-align: center
  }
  `]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
