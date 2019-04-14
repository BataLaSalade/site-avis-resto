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
  filteredListResto: Resto[] = new Array<Resto>();
  isShowError: boolean = false;
  minSelectedValue: string = "0";
  maxSelectedValue: string = "5";
  map: google.maps.Map;
  service: google.maps.places.PlacesService;
  userPosition: google.maps.LatLng;

  callbackGetPlaces(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("===== RESULTS =====");
      console.log(results);
      console.log("===================");
      this.placeService.setListResto(results);
      
    }
  }

  getPlaces(map: google.maps.Map, userPosition: google.maps.LatLng ) {
    console.log("MAP - getPlaces()", map);
    console.log("userPosition - getPlaces()", userPosition);
    let service = new google.maps.places.PlacesService(map);
    console.log("service - getPlaces()", service);
    let request = {
      location: userPosition,
      radius: '1000',
      type: ['restaurant']
    }
    console.log("request - getPlaces()", request);
    service.nearbySearch(request, this.callbackGetPlaces.bind(this));
    
    
  }

  onMinSelectEventChange(minSelectedValue) {
    this.minSelectedValue = minSelectedValue;
    this.displayFilteredListResto(this.minSelectedValue, this.maxSelectedValue);
  }

  onMaxSelectEventChange(maxSelectedValue) {
    this.maxSelectedValue = maxSelectedValue;
    this.displayFilteredListResto(this.minSelectedValue, this.maxSelectedValue);
  }

  onDiscardFilterEventChange() {
    this.filteredListResto = this.listResto;
  }

  displayFilteredListResto(minSelectedValue: string, maxSelectedValue: string) {
    let minValue: number = Number(minSelectedValue);
    let maxValue:number = Number(maxSelectedValue);
    if (minValue >= 0 && maxValue <= 5) {
        this.filteredListResto = this.listResto.filter(
          (resto: any) => resto.rating >= minValue && resto.rating <= maxValue
        );
        this.isShowError = (this.filteredListResto.length == 0) ? true : false;
    } else {
        this.filteredListResto = this.listResto;
    }
}
  
  ngOnInit() {
    this.placeService.restoSubject$.subscribe(
      places => {
        this.listResto = places;
        this.filteredListResto = places;
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
