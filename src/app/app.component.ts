/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Resto } from './model/Resto';
import { UserService } from '../app/services/user.service'
import { PlacesService } from './services/places.service';
import { zip } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private userService: UserService,
    private placeService: PlacesService){}

  listResto: Resto[] = new Array<Resto>();
  userPosition: google.maps.LatLng;

  callbackGetPlaces(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.placeService.setListResto(results);
      this.placeService.setListMarkers(results);
    }
  }

  getPlaces(map: google.maps.Map, userPosition: google.maps.LatLng ) {
    let service = new google.maps.places.PlacesService(map);
    let request = {
      location: userPosition,
      radius: 1500,
      type: 'restaurant'
    }
    service.nearbySearch(request, this.callbackGetPlaces.bind(this));
  }
  
  ngOnInit() {
    this.placeService.restoSubject$.subscribe(
      places => {
        this.listResto = places;
      }
    )

    zip(this.placeService.mapSubject$, this.userService.userSubject$).subscribe(
      params => {
        let map = params[0];
        let location = params[1];
        if (typeof location.coords != 'undefined') {
          let userPos = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
          this.getPlaces(map, userPos);
        }
      }
    )
  }
}
