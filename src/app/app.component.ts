import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mode_var = 'slide';
  private _opened: any = false;
  loggingIn: any = true;
  dontShow: any = true;
  loggedInAs: any;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(private router: Router) {
    console.log('app const');
  }

  goToFieldwork() {
    this.router.navigate(['/fieldwork']);
  }

  goToLaunchpad() {
    this.router.navigate(['/entrypage']);
  }

  goToDocReq() {
    this.router.navigate(['/docreq']);
  }

  goToDocViewReq() {
    this.router.navigate(['/viewdocreq']);
  }

  navLoggedIn(value) {
    console.log(value);
    if (value === 'P') {
      this.loggingIn = false;
      this.loggedInAs = 'Admin';
      this.router.navigate(['/entrypage']);
    } else {
      this.loggedInAs = 'Dwayne Johnson';
      this.loggingIn = false;
      this.dontShow = false;
      this.router.navigate(['/cliView']);
    }
  }
}
