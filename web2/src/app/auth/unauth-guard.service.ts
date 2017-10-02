import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    
    return this.authService.authenticated$.take(1).map(authState => !authState).do(unauthenticated => {
      if (!unauthenticated) {
        // debugger;
        this.router.navigate(['/']);
      }
  });
  }

  // canActivate(): Observable<boolean> {
    
  //   return this.authService.authState$.take(1).map(authState => !authState).do(unauthenticated => {
  //     if (!unauthenticated) {
  //       // debugger;
  //       this.router.navigate(['/']);
  //     }
  // });
  // }
}