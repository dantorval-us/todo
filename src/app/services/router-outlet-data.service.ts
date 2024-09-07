import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterOutletDataService {

  private _data = new BehaviorSubject('');
  $data = this._data.asObservable();

  changeData(data: string) {
    this._data.next(data);
  }

}
