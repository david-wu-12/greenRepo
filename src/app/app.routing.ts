import { Routes, RouterModule } from '@angular/router';
import { EntryPageComponent } from '../app/entry-page/entry-page.component';
import { FieldworkComponent } from '../app/fieldwork/fieldwork.component';



const APP_ROUTES =  [
  { path: '', redirectTo: '/entrypage', pathMatch: 'full'},
  { path: 'entrypage', component: EntryPageComponent, data: {depth: 1} },
  { path: 'fieldwork', component: FieldworkComponent, data: {depth: 1} }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
