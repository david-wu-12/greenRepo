import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionService } from '../services/action.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { TimelineElement } from '../horizontal-timeline/timeline-element';
import { CalendarEvent } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

@Component({
  selector: 'app-fieldwork',
  templateUrl: './fieldwork.component.html',
  styleUrls: ['./fieldwork.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FieldworkComponent implements OnInit {
  coursesObservable: Observable<any[]>;
  content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae 
  ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, 
  ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam 
  quisquam, quae, temporibus dolores porro doloribus.`;

  timeline: TimelineElement[] = [
    { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content },
    { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
    { caption: '20 Mar', date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
    { caption: '20 May', date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
    { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
    { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
    { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
    { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
    { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
    { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
    { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
  ];

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  view: any = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.blue
    },
    ,
    {
      title: 'Editable event',
      color: this.colors.yellow,
      start: new Date(),
      actions: [
        {
          label: '<i class="fa fa-fw fa-pencil"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            console.log('Edit event', event);
          }
        }
      ]
    },
    {
      title: 'Deletable event',
      color: this.colors.blue,
      start: new Date(),
      actions: [
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            console.log('Event deleted', event);
          }
        }
      ]
    },
    {
      title: 'Non editable and deletable event',
      color: this.colors.red,
      start: new Date()
    }
  ];

  activeDayIsOpen: any = true;

  docRequestlist = [
    {
      Ref: '10',
      RelatedSystem: 'AD',
      RelatedControl: 'IT ELC-01',
      ControlName: 'IT POLICIES',
      DocumentReuqest: 'Evidence that the Culligan Corporate Security Policies and Procedures are' 
      + 'communicated to employees and/or accessible via a central repository',
      TypeofEvidence: 'System-generated',
      Owner: 'Tom Brady',
      DateRequested: '12/12/2012',
      DateDue: '12/12/2020',
      Status: 'Pending',
      Comments: 'there are no comments',
   },
    {
      Ref: '10',
      RelatedSystem: 'AD',
      RelatedControl: 'IT ELC-01',
      ControlName: 'IT POLICIES',
      DocumentReuqest: 'Evidence that the Culligan Corporate Security Policies and Procedures are' 
      + 'communicated to employees and/or accessible via a central repository',
      TypeofEvidence: 'System-generated',
      Owner: 'Tom Brady',
      DateRequested: '12/12/2012',
      DateDue: '12/12/2020',
      Status: 'Pending',
      Comments: 'there are no comments',
    },
    {
      Ref: '10',
      RelatedSystem: 'AD',
      RelatedControl: 'IT ELC-01',
      ControlName: 'IT POLICIES',
      DocumentReuqest: 'Evidence that the Culligan Corporate Security Policies and Procedures are' 
      + 'communicated to employees and/or accessible via a central repository',
      TypeofEvidence: 'System-generated',
      Owner: 'Tom Brady',
      DateRequested: '12/12/2012',
      DateDue: '12/12/2020',
      Status: 'Pending',
      Comments: 'there are no comments',
    },
  ];

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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  addForm(formToAdd: NgForm) {
    console.log(formToAdd);
    const newDoc = {
      Ref: 'N/A',
      RelatedSystem: 'N/A',
      RelatedControl: 'N/A',
      ControlName: 'N/A',
      DocumentReuqest: 'N/A',
      TypeofEvidence: 'N/A',
      Owner: 'N/A',
      DateRequested: 'N/A',
      DateDue: 'N/A',
      Status: 'N/A',
      Comments: 'N/A',
    };
    if ( !(formToAdd.value.comment.trim() === '') ) {
      newDoc.Comments = formToAdd.value.comment.trim();
      formToAdd.controls.comment.setValue('');
    }
    if ( !(formToAdd.value.conName.trim() === '') ) {
      newDoc.ControlName = formToAdd.value.conName.trim();
      formToAdd.controls.conName.setValue('');
    }
    if ( !(formToAdd.value.dateDue.trim() === '') ) {
      newDoc.DateDue = formToAdd.value.dateDue.trim();
      formToAdd.controls.dateDue.setValue('');
    }
    if ( !(formToAdd.value.dateReq.trim() === '') ) {
      newDoc.DateRequested = formToAdd.value.dateReq.trim();
      formToAdd.controls.dateReq.setValue('');

    }
    if ( !(formToAdd.value.docReq.trim() === '') ) {
      newDoc.DocumentReuqest = formToAdd.value.docReq.trim();
      formToAdd.controls.docReq.setValue('');

    }
    if ( !(formToAdd.value.owner.trim() === '') ) {
      newDoc.Owner = formToAdd.value.owner.trim();
      formToAdd.controls.owner.setValue('');

    }
    if ( !(formToAdd.value.ref.trim() === '') ) {
      newDoc.Ref = formToAdd.value.ref.trim();
      formToAdd.controls.ref.setValue('');

    }
    if ( !(formToAdd.value.relCon.trim() === '') ) {
      newDoc.RelatedControl = formToAdd.value.relCon.trim();
      formToAdd.controls.relCon.setValue('');

    }
    if ( !(formToAdd.value.relSys.trim() === '') ) {
      newDoc.RelatedSystem = formToAdd.value.relSys.trim();
      formToAdd.controls.relSys.setValue('');

    }
    if ( !(formToAdd.value.status.trim() === '') ) {
      newDoc.Status = formToAdd.value.status.trim();
      formToAdd.controls.status.setValue('');

    }
    if ( !(formToAdd.value.toe.trim() === '') ) {
      newDoc.TypeofEvidence = formToAdd.value.toe.trim();
      formToAdd.controls.toe.setValue('');

    }
    this.docRequestlist.push(newDoc);
  }

  removeDoc(doc) {
    const indexToRemove = this.docRequestlist.findIndex(d => d.Ref === doc.Ref);
    this.docRequestlist.splice(indexToRemove, 1);

  }

}
