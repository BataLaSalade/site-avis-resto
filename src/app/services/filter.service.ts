import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  minSelect$: BehaviorSubject<string>;
  maxSelect$: BehaviorSubject<string>;
  isClearMarkersNeeded: BehaviorSubject<boolean>;

  constructor() {
    this.minSelect$ = new BehaviorSubject<string>("0");
    this.maxSelect$ = new BehaviorSubject<string>("5");
  }

  setMinValue(minValue) {
    this.minSelect$.next(minValue)
  }

  setMaxValue(maxValue) {
    this.maxSelect$.next(maxValue);
  }

}
