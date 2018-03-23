import { Routes, RouterModule } from '@angular/router';
import { EntryPageComponent } from '../app/entry-page/entry-page.component';
import { FieldworkComponent } from '../app/fieldwork/fieldwork.component';
import { DocreqComponent } from '../app/docreq/docreq.component';



const APP_ROUTES =  [
  { path: '', redirectTo: '/entrypage', pathMatch: 'full'},
  { path: 'entrypage', component: EntryPageComponent, data: {depth: 1} },
  { path: 'fieldwork', component: FieldworkComponent, data: {depth: 1} },
  { path: 'docreq', component: DocreqComponent, data: {depth: 1} }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
