import { Routes, RouterModule } from '@angular/router';
import { EntryPageComponent } from '../app/entry-page/entry-page.component';



const APP_ROUTES =  [
  { path: '', redirectTo: '/entrypage', pathMatch: 'full'},
  { path: 'entrypage', component: EntryPageComponent, data: {depth: 1} }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
