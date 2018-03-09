import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';

@Injectable()
export class ActionService {
  constructor(private dataService: DataService) { }

  getComments(url): Observable<any> {
     return this.dataService.get<any>(url);
  }

}
