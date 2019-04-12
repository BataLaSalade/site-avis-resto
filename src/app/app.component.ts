/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Resto } from './model/Resto';
import { UserService } from '../app/services/user.service'
import { PlacesService } from './services/places.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private userService: UserService,
    private placeService: PlacesService){}

  listResto: Resto[];
  filteredListResto: Resto[];
  isShowError: boolean = false;
  minSelectedValue: string = "0";
  maxSelectedValue: string = "5";
  map: google.maps.Map;
  service: google.maps.places.PlacesService;

  /* Used for mock called onInit
  listRestoObservable = this.restoService.getListResto();
  */

  changedMap(mapSetting){
    this.map = mapSetting.map;
    var userCoords = mapSetting.userLocation.coords;
    var userLocation = new google.maps.LatLng(userCoords.latitude, userCoords.longitude);
    this.getPlaces(this.map, userLocation);
  }

  callbackGetPlaces(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      //this.listResto = results;
      //this.filteredListResto = results;
      this.placeService.setListResto(results);
    }
  }

  getPlaces(map: google.maps.Map, userPosition: google.maps.LatLng ) {
    this.service = new google.maps.places.PlacesService(map);
    let request = {
      location: userPosition,
      radius: '10000',
      type: ['restaurant']
    }
    //this.service.nearbySearch(request, this.callbackGetPlaces.bind(this));
  }

  /*
  Used for mock called onInit
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
  
  ngOnInit() {
    this.placeService.setListResto(["toto", "tata", "tutu"])
    this.placeService.restoSubject$.subscribe(
      value => console.log("Coucou",value)
    )
    this.placeService.setListResto(["riri", "fifi", "loulou"])
  
    this.placeService.mapSubject$.subscribe(
      map => console.log("pass map to appCompo with Subject",map)
    )
  
  }
}
