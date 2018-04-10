import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';


@Injectable()
export class DocStore {

  private _document: BehaviorSubject<any> = new BehaviorSubject(new Array<any>());

  constructor() {
    console.log('appstore const');
  }

  get docList() {
    return this._document.asObservable();
  }

  updateData(newdocument) {
    this._document.next(newdocument);
  }


}
