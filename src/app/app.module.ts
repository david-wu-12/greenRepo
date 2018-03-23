import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { ActionService } from '../app/services/action.service';
import { DataService } from '../app/services/data.service';
import { AppComponent } from './app.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HeaderComponent } from './header/header.component';
import { SidebarModule } from 'ng-sidebar';
import { HorizontalTimelineComponent } from './horizontal-timeline/horizontal-timeline.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { CalendarCommonModule } from 'angular-calendar';
import { CalendarMonthModule } from 'angular-calendar';
import { DemoUtilsModule } from '../demo-utils/module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FieldworkComponent } from './fieldwork/fieldwork.component';
import { DocreqComponent } from './docreq/docreq.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    EntryPageComponent,
    HeaderComponent,
    HorizontalTimelineComponent,
    FieldworkComponent,
    DocreqComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    SidebarModule.forRoot(),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    CalendarModule.forRoot(),
    CalendarCommonModule,
    CalendarMonthModule,
    DemoUtilsModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()

  ],
  providers: [
    DataService,
    ActionService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
