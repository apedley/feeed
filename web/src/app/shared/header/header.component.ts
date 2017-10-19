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
  }

  ngOnInit() {

  }


  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

}
