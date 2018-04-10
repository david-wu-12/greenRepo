import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  animations: [
    trigger('heroState', [
      state('false', style({
        height: '50%'
      })),
      state('true',   style({
        height: '100%'
      })),
      state('gone',   style({
        height: '0px',
        opacity: '0',
        overflow: 'hidden',
      })),
      transition('false => true', animate('800ms ease-in')),
      transition('false => gone', animate('800ms ease-in')),

    ]),
    trigger('heroState2', [
      state('false', style({
        height: '50%'
      })),
      state('true',   style({
        height: '100%'
      })),
      state('gone',   style({
        height: '0px',
        opacity: '0',
        overflow: 'hidden',
      })),
      transition('false => true', animate('800ms ease-in')),
      transition('false => gone', animate('800ms ease-in')),
    ])
  ]
})
export class LoginpageComponent implements OnInit {
  @Output() showPage = new EventEmitter<any>();
  statusAni: any = false;
  statusAni2: any = false;
  constructor() { }

  ngOnInit() {
  }

  toggleState(type: any) {
    if (type === 'P') {
        this.statusAni = true;
        this.statusAni2 = 'gone';
        setTimeout(() => {
          this.showPage.emit('P');
        }, 1000);

    } else {
        this.statusAni2 = true;
        this.statusAni = 'gone';
        setTimeout(() => {
          this.showPage.emit('');
        }, 1000);
    }
  }
}
