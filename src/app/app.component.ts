/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Resto } from './model/Resto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(){}

  listResto: Resto[];
  filteredListResto: Resto[];
  isShowError: boolean = false;
  minSelectedValue: string = "0";
  maxSelectedValue: string = "5";
  map: google.maps.Map;
  service: google.maps.places.PlacesService;
  userPosition = new google.maps.LatLng(43.629067899999995, 5.0836215)

  request = {
    location: this.userPosition,
    radius: '1000',
    type: ['restaurant']
  }; 

  /* Used for mock called onInit
  listRestoObservable = this.restoService.getListResto();
  */

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
    this.service = new google.maps.places.PlacesService(map);
    this.service.nearbySearch(this.request, this.callbackGetPlaces.bind(this));
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
    
  }
}
