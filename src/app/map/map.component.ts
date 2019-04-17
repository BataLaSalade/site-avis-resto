/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges} from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";
import { PlacesService } from '../services/places.service';
import { Location } from '../model/Location';
import { zip } from 'rxjs';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor(
    private userService: UserService,
    private placeService: PlacesService,
    private filterService: FilterService) {}

  @ViewChild('map') mapElement: any;

  listResto: Resto[] = new Array<Resto>();
  listMarkers: google.maps.Marker[];
  userMarker:string = "../../assets/img/1x/userFichier 2.png";
  zoom: number = 15;
  restoMarker: string = "../../assets/img/1x/restoFichier4.png";
  userLocation: any;
  map: google.maps.Map;

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.map = map;

      var marker = new google.maps.Marker({
        position: {lat: location.coords.latitude, lng: location.coords.longitude},
        icon: this.userMarker,
        map: map
      });
      this.placeService.setMap(map);
      this.userService.userSubject$.next(location);

      /* let index: number;
        for (index = 0; index< this.listResto.length; index++) {
          let marker = new google.maps.Marker({
            position: this.listResto[index].geometry.location,
            icon: this.restoMarker,
            map: map
          });
        } */
        console.log("listResto initMap() = ", this.listResto)
    });
  }

  addRestoMarkers(listResto: Resto[], map: google.maps.Map, listMarkers: google.maps.Marker[]) {
    let index: number;
    for (index = 0; index< listResto.length; index++) {
      let marker = new google.maps.Marker({
        position: listResto[index].geometry.location,
        icon: this.restoMarker
      });
      listMarkers.push(marker)
    }
    console.log("addRestoMarkers() listMarkers => ", listMarkers);
  }

  // Sets the map on all markers in the array.
  setMapOnAll(map: google.maps.Map, listMarkers: google.maps.Marker[]) {
    for (var i = 0; i < listMarkers.length; i++) {
      listMarkers[i].setMap(map);
    }
    console.log("setMapOnAll() listMarkers => ", listMarkers);
  }

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers(map: google.maps.Map, listMarkers: google.maps.Marker[]) {
    this.setMapOnAll(null, listMarkers);
    console.log("clearMarkers() listMarkers => ", listMarkers);
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers(map: google.maps.Map, listMarkers: google.maps.Marker[]) {
    this.clearMarkers(map, listMarkers);
    listMarkers = [];
    console.log("deleteMarkers() listMarkers => ", listMarkers);
  }


  ngOnInit() {
    this.initMap();

    this.placeService.markersSubject$.subscribe(
      places => {
        this.listResto = places
        let listMarkers: google.maps.Marker[] = [];
        console.log("listResto subscription = ", this.listResto);
        console.log("listMarkers = ", listMarkers);
        console.log("===== clearMarkers =====");
        console.log("//TODO");
        //this.deleteMarkers(this.map, listMarkers);
        console.log("===== addRestoMarkers =====");
        this.addRestoMarkers(this.listResto, this.map, listMarkers);
        this.setMapOnAll(this.map, listMarkers);

      }
    ); 

  }
}
