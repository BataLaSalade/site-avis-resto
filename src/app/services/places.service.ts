import { Injectable } from '@angular/core';
import { Resto } from '../model/Resto';
import { Observable, from, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  restoSubject$: BehaviorSubject<Resto[]>;
  filteredRestoSubject$: BehaviorSubject<Resto[]>;
  mapSubject$: BehaviorSubject<any>;

  constructor() {
    this.restoSubject$ = new BehaviorSubject(
      new Array<Resto>()
    );

    this.filteredRestoSubject$ = new BehaviorSubject(
      new Array<Resto>()
    );

    this.mapSubject$ = new BehaviorSubject(
      {}
    );
  }

  setMap(map: google.maps.Map){
    this.mapSubject$.next(map);
  }

  setListResto(listResto: Resto[]) {
    this.restoSubject$.next(listResto);
  }
  
  setFilteredListResto(listResto: Resto[]) {
    this.filteredRestoSubject$.next(listResto);
  }
}
