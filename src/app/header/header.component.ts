import { Component, OnInit, Output, EventEmitter, OnDestroy, Input  } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() showNav = new EventEmitter();
  @Input() loggedinUser: any;
  routerSub: any;
  headerText: any;
  innerWidth: any;
  imgType: any;
  constructor(private actRoute: Router) { }

  ngOnInit() {
    this.innerWidth = (window.screen.width) + 'px';
    this.headerText = 'IT Audit Dashboard';
    this.routerSub = this.actRoute.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        console.log(url);
        switch (url) {
          case '/docreq': {
            this.headerText = 'Document Request List Template';
            break;
          }
          case '/entrypage': {
             this.headerText = 'IT Audit Dashboard';
             break;
          }
          case '/fieldwork': {
             this.headerText = 'Fieldwork';
             break;
          }
          case '/viewdocreq': {
            this.headerText = 'View Document Request List';
            break;
         }
          default: {
            this.headerText = 'IT Audit Dashboard';
            break;
          }
       }
      }
  });
    if (this.loggedinUser === 'Admin' ) {
        this.imgType = '../assets/pro.png';
    } else {
      this.imgType = '../assets/ZCA.png';
    }

  }

  toggleSidebar() {
    this.showNav.emit();
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
