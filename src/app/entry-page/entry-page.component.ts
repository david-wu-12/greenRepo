import { Component, OnInit, ChangeDetectionStrategy, EventEmitter  } from '@angular/core';
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
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EntryPageComponent implements OnInit {
  coursesObservable: Observable<any[]>;
  content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae 
  ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae, 
  ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam 
  quisquam, quae, temporibus dolores porro doloribus.`;

  timeline: TimelineElement[] = [
    { caption: '1 Jan', date: new Date(2018, 1, 1), selected: true, title: 'Project Kickoff', content: this.content },
    { caption: '5 Jan', date: new Date(2018, 1, 5), title: 'Budget and Staffing Documents', content: this.content },
    { caption: '12 Jan', date: new Date(2018, 1, 12), title: 'Planning and Scoping Memo', content: this.content },
    { caption: '26 Jan', date: new Date(2018, 1, 26), title: 'Document Templates Created', content: this.content },
    { caption: '5 Feb', date: new Date(2018, 2, 5), title: 'Document Request List Sent', content: this.content },
    { caption: '16 Feb', date: new Date(2018, 2, 16), title: 'Documents Requested Due', content: this.content },
    { caption: '16 Mar', date: new Date(2018, 3, 16), title: 'Completed Testing Workbook', content: this.content },
    { caption: '23 Mar', date: new Date(2018, 3, 23), title: 'Remediation Plans Finalized', content: this.content },
    { caption: '27 Mar', date: new Date(2018, 3, 27), title: 'Audit Report Issued', content: this.content },
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
      title: 'Team Member One',
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
      title: 'Team Member Two',
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

  deliverableList: any;

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  constructor(private actionService: ActionService, private db: AngularFireDatabase) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

   }

  ngOnInit() {
    // this.actionService.getComments('https://jsonplaceholder.typicode.com/posts')
    // .subscribe( res => {
    //   console.log(res);
    // });

    this.deliverableList = [
      {
        id: 1,
        name: 'Document A',
      },
      {
        id: 2,
        name: 'Document B',
      },
      {
        id: 3,
        name: 'Document D',
      },
      {
        id: 4,
        name: 'Document B',
      },
      {
        id: 5,
        name: 'Document D',
      },
      {
        id: 6,
        name: 'Document B',
      },
      {
        id: 7,
        name: 'Document C',
      }
    ];

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

  addDelive(newD) {
    console.log(newD.value);
    const newDel = {
      name: newD.value
    };
    this.deliverableList.push(newDel);
    newD.value = '';
  }

  removeDeliv(delD) {
    console.log(delD);
    const indexTodelete = this.deliverableList.findIndex( d => d.id === delD );
    console.log(indexTodelete);
    this.deliverableList.splice(indexTodelete, 1);
  }

  onUploadOutput(output: UploadOutput): void {
    const newDel = {
      name: output.file.name,
      id: output.file.id
    };
    this.deliverableList.push(newDel);
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: '',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

}
