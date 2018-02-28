import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { ActionService } from '../app/services/action.service';
import { DataService } from '../app/services/data.service';
import { AppComponent } from './app.component';
import { EntryPageComponent } from './entry-page/entry-page.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    EntryPageComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule
  ],
  providers: [
    DataService,
    ActionService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
