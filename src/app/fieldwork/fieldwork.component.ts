import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionService } from '../services/action.service';
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
  content = `January 1st marks the kickoff of this IT Audit and the ensuing phases of the project, beginning with planning, followed by fieldwork and reporting with an estimated date of completion of March 30th.`;
  content2 = 'Protiviti and client team has agreed to a set budget for the project and the Protiviti team staffing has been established. Documents have been uploaded to the ProjectView portal.';
  content3 = 'Protiviti and client team have established a set project plan for the duration of the project, including schedule of phases and deliverables. Memo has been uploaded to the ProjectView portal.';
  content4 = 'Protiviti team has finalized the testing worksheets, testing status spreadsheet, status meeting template, and audit report template and uploaded them to the ProjectView portal.';

  timeline: TimelineElement[] = [
    { caption: '5 Feb', date: new Date(2018, 2, 5), selected: true, title: 'Document Request List Sent', content: this.content },
    { caption: '16 Feb', date: new Date(2018, 2, 16), title: 'Documents Requested Due', content: this.content2 },
    { caption: '16 Mar', date: new Date(2018, 3, 16), title: 'Completed Testing Workbook', content: this.content3 },
    { caption: '5 Feb', date: new Date(2018, 5, 5),  title: 'Document Request List Sent 2', content: this.content4 },
    { caption: '16 Feb', date: new Date(2018, 6, 16), title: 'Documents Requested Due 2', content: this.content },
    { caption: '16 Mar', date: new Date(2018, 7, 16), title: 'Completed Testing Workbook 2', content: this.content },
    { caption: '5 Feb', date: new Date(2018, 8, 5),  title: 'Document Request List Sent 2', content: this.content },
    { caption: '16 Feb', date: new Date(2018, 9, 16), title: 'Documents Requested Due 2', content: this.content },
    { caption: '16 Mar', date: new Date(2018, 10, 16), title: 'Completed Testing Workbook 2', content: this.content },
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
      title: 'Add member',
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
      title: 'Team 1',
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
      title: 'Team 2',
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
    }
  ];

  activeDayIsOpen: any = true;

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

}
