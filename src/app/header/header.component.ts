import { Component, OnInit, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() showNav = new EventEmitter();
  routerSub: any;
  headerText: any;
  constructor(private actRoute: Router) { }

  ngOnInit() {
    this.routerSub = this.actRoute.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        console.log(url);
        switch (url) {
          case '/docreq': {
            this.headerText = 'Document Request List';
            break;
          }
          case '/entrypage': {
             this.headerText = 'IT Audit Launchpad';
             break;
          }
          case '/fieldwork': {
             this.headerText = 'Fieldwork';
             break;
          }
          default: {
             console.log('Invalid choice');
             break;
          }
       }
      }
  });
  }

  toggleSidebar() {
    this.showNav.emit();
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
