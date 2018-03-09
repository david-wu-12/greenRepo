import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mode_var = 'slide';
  private _opened: any = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
