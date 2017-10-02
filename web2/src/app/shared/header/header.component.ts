import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile: any;
  menuOpen: boolean;

  constructor(public authService: AuthService) { 
    this.menuOpen = false;
    this.profile = null;

    // this.authService = authService;

    // if (this.authService.userProfile) {
    //   this.profile = this.authService.userProfile;
    // } else {
    //   this.authService.getProfile()
    //     .then((profile) => {
    //       this.profile = profile;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.profile = null;
    //     });
    // }
  }

  ngOnInit() {

  }

  loginButtonClicked(): void {
    // this.authService.login();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    console.log(this.menuOpen);
  }

}
