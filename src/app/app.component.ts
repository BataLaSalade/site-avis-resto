/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Resto } from './model/Resto';
import { UserService } from '../app/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private userService: UserService){}

  listResto: Resto[];
  filteredListResto: Resto[];
  isShowError: boolean = false;
  minSelectedValue: string = "0";
  maxSelectedValue: string = "5";
  map: google.maps.Map;
  service: google.maps.places.PlacesService;
  userPosition = new google.maps.LatLng(43.629069099999995, 5.0835969);
  userLat: number;
  userLong: number;
  request = {
    location: this.userPosition,
    radius: '1000',
    type: ['restaurant']
  }; 

  /* Used for mock called onInit
  listRestoObservable = this.restoService.getListResto();
  */
 refreshUserPosition() {
  this.userService.getUserPosition(this.success.bind(this), this.error);
}

success(position) {
  var coords = position.coords;
  if(coords != null && coords.latitude != null) {
    this.userLat = coords.latitude;
    this.userLong = coords.longitude;
    console.log("userlat = ", this.userLat)
    console.log("userLng = ", this.userLong)
    console.log("coords type", typeof coords.latitude)

    //this.userMarker = "../../assets/img/1x/userFichier 2.png";
  }
}

error(error) {
  console.warn(`map ERREUR (${error.code}): ${error.message}`);
}

  changedMap(map){
    this.map = map;
    this.getPlaces(this.map);
  }

  callbackGetPlaces(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.listResto = results;
      this.filteredListResto = results;
    }
  }

  getPlaces(map: google.maps.Map) {
    var userPosition = new google.maps.LatLng(43.6290516, 5.0836046999999995);
    this.service = new google.maps.places.PlacesService(map);
    this.service.nearbySearch(this.request, this.callbackGetPlaces.bind(this));
    console.log("user lat = " + userLat + " user long " + userLng)
    console.log("userPosition = ", userPosition)
  }

  /* Used for mock called onInit
  setListResto(): void {
    this.listRestoObservable.subscribe(
      listResto => {
          this.listResto = listResto;
          this.filteredListResto = listResto;
          console.log("from appComponent",this.listResto);
      }
    )
  } 
  */

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

  ngOnInit(){
    this.refreshUserPosition();
    //console.log("coucou ", this.userLat)
  }
}
