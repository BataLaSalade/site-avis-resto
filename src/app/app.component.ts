/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { RestoService } from '../app/services/resto.service';
import { Resto } from './model/Resto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  constructor(private restoService: RestoService){}

  @ViewChild('map') mapElement: any;

  listResto: Resto[];
  filteredListResto: Resto[];
  isShowError: boolean = false;
  minSelectedValue: string = "0";
  maxSelectedValue: string = "5";
  map: any;
  mapProperties = {
    center: new google.maps.LatLng(43.629067899999995, 5.0836215),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  userPosition = new google.maps.LatLng(43.629067899999995, 5.0836215)
  request = {
    location: this.userPosition,
    radius: '1000',
    type: ['resaurant']
  };

  listRestoObservable = this.restoService.getListResto();

  onMapLoad(map) {
    this.map = map;
  }

  callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
    }
  }

  setListResto(): void {
    this.listRestoObservable.subscribe(
      listResto => {
          this.listResto = listResto;
          this.filteredListResto = listResto;
          console.log("from appComponent",this.listResto);
      }
    )
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

  ngOnInit(){
    this.setListResto()
    //this.initMap()
  }

  ngAfterViewInit(){
    //this.initMap()
  }
}
