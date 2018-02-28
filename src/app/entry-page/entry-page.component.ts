import { Component, OnInit } from '@angular/core';
import { ActionService } from '../services/action.service';


@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {

  constructor(private actionService: ActionService) { }

  ngOnInit() {
    this.actionService.getComments('https://jsonplaceholder.typicode.com/posts')
    .subscribe( res => {
      console.log(res);
    });
  }

}
