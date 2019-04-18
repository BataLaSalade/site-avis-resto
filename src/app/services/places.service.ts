import { Injectable } from '@angular/core';
import { Resto } from '../model/Resto';
import { Observable, from, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  restoSubject$: BehaviorSubject<Resto[]>;
  filteredRestoSubject$: BehaviorSubject<Resto[]>;
  markersSubject$: BehaviorSubject<any[]>
  mapSubject$: BehaviorSubject<any>;
  selectedRestoSubject$: BehaviorSubject<Resto>;
  isSelectedResto$: BehaviorSubject<boolean>;

  constructor() {
    this.restoSubject$ = new BehaviorSubject(
      new Array<Resto>()
    );

    this.filteredRestoSubject$ = new BehaviorSubject(
      new Array<Resto>()
    );

    this.selectedRestoSubject$ = new BehaviorSubject(
      new Resto()
    );

    this.isSelectedResto$ = new BehaviorSubject (false);

    this.markersSubject$ = new BehaviorSubject(
      new Array<any>()
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

  setSelectedResto(selectedResto: Resto) {
    this.selectedRestoSubject$.next(selectedResto);
  }

  setListMarkers(listResto: Resto[]) {
    this.markersSubject$.next(listResto);
  }
}
