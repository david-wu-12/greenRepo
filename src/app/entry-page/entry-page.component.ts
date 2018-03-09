import { Component, OnInit } from '@angular/core';
import { ActionService } from '../services/action.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database'; 


@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {
  coursesObservable: Observable<any[]>;
  constructor(private actionService: ActionService, private db: AngularFireDatabase) { }

  ngOnInit() {
    // this.actionService.getComments('https://jsonplaceholder.typicode.com/posts')
    // .subscribe( res => {
    //   console.log(res);
    // });

    this.coursesObservable = this.db.list('courses').valueChanges();
    console.log(this.coursesObservable);
    this.coursesObservable.subscribe( res => {
      console.log(res);
    });
  }


}
