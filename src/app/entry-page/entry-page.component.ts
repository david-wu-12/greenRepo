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
  content = `January 1st marks the kickoff of this IT Audit and the ensuing phases of the project, beginning with planning, followed by fieldwork and reporting with an estimated date of completion of March 30th.`;
  content2 = 'Protiviti and client team has agreed to a set budget for the project and the Protiviti team staffing has been established. Documents have been uploaded to the ProjectView portal.';
  content3 = 'Protiviti and client team have established a set project plan for the duration of the project, including schedule of phases and deliverables. Memo has been uploaded to the ProjectView portal.';
  content4 = 'Protiviti team has finalized the testing worksheets, testing status spreadsheet, status meeting template, and audit report template and uploaded them to the ProjectView portal.';
  content5 = 'Protiviti team has shared a complete Document Request List with the client which can be accessed in the ProjectView portal. This DRL outlines the evidence that the Protiviti team needs to obtain from the client in order to complete testing. Each item that Protiviti has requested is a separate line item with an owner and deadline, and the list can be filtered by owner to see all document requests assigned to any individual. The DRL is live and updates as documents are received';
  content6 = 'The documents that Protiviti has requested as evidence for testing are due by this date. In order to continue with the set project schedule, Protiviti requires all evidence to be uploaded by this date in order to avoid delays in testing.';
  content7 = 'Protiviti team has completed testing all controls and the Testing Workbook has been completely filled out with all information applicable. The Testing Workbook has been uploaded to the ProjectView portal and is accessible by individuals from the client to view the conclusions and related evidence as needed.';
  content8 = 'All testing results and exceptions have been shared with the client. Remediation plans have been decided upon between the Protiviti team and the client team, including owners, priority, and remediation date. Relevant documents have been uploaded to the ProjectView portal.';
  content9 = 'A close meeting has been held, and the final Audit Report has been issued. The document is accessible in the ProjectView portal, along with all previous documentation throughout the life of the project.';

  timeline: TimelineElement[] = [
    { caption: '1 Jan', date: new Date(2018, 1, 1), selected: true, title: 'Project Kickoff', content: this.content },
    { caption: '5 Jan', date: new Date(2018, 1, 5), title: 'Budget and Staffing Documents', content: this.content2 },
    { caption: '12 Jan', date: new Date(2018, 1, 12), title: 'Planning and Scoping Memo', content: this.content3 },
    { caption: '26 Jan', date: new Date(2018, 1, 26), title: 'Document Templates Created', content: this.content4 },
    { caption: '5 Feb', date: new Date(2018, 2, 5), title: 'Document Request List Sent', content: this.content5 },
    { caption: '16 Feb', date: new Date(2018, 2, 16), title: 'Documents Requested Due', content: this.content6 },
    { caption: '16 Mar', date: new Date(2018, 3, 16), title: 'Completed Testing Workbook', content: this.content7 },
    { caption: '23 Mar', date: new Date(2018, 3, 23), title: 'Remediation Plans Finalized', content: this.content8 },
    { caption: '27 Mar', date: new Date(2018, 3, 27), title: 'Audit Report Issued', content: this.content9 },
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
        name: 'Very Important Document',
      },
      {
        id: 2,
        name: 'Deliverable For Zero Carbon Folks',
      },
      {
        id: 3,
        name: 'Zero Carbon Assement and Bill',
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
