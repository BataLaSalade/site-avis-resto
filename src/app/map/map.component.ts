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
  listMarkers: google.maps.Marker[] = []
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
    });
  }

  addRestoMarkers(listResto: Resto[], map: google.maps.Map, listMarkers: google.maps.Marker[]) {
    let index: number;
    for (index = 0; index< listResto.length; index++) {
      let marker = new google.maps.Marker({
        position: listResto[index].geometry.location,
        icon: this.restoMarker,
        title: listResto[index].name
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

    this.placeService.restoSubject$.subscribe(
      places => {
        this.listResto = places
        console.log("Resto$", this.listResto)
        console.log("listMarkers", this.listMarkers)
        console.log("===== addRestoMarkers =====");
        this.addRestoMarkers(this.listResto, this.map, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
      }
    )

    this.placeService.filteredRestoSubject$.subscribe(
      places => {
        this.listResto = places
        console.log("filteredResto$ = ", this.listResto)
        console.log("listMarkers", this.listMarkers)
        console.log("===== clearMarkers =====");
        for (var i = 0; i < this.listMarkers.length; i++) {
          this.listMarkers[i].setMap(null);
        }
        console.log("listMarkers", this.listMarkers);
        this.listMarkers = []
        console.log("listMarkers", this.listMarkers);
        this.addRestoMarkers(this.listResto, this.map, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
      }
    )

    /* this.placeService.markersSubject$.subscribe(
      places => {
        this.listResto = places;
        console.log("listResto subscription = ", this.listResto);
        console.log("listMarkers = ", this.listMarkers);
        console.log("===== addRestoMarkers =====");
        this.addRestoMarkers(this.listResto, this.map, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
        

      }
    ); 
    this.filterService.isClearMarkersNeeded.subscribe(
      isClear => {
        console.log("===== clearMarkers =====");
        console.log(isClear);
        console.log("//TODO");
        for (var i = 0; i < this.listMarkers.length; i++) {
          this.listMarkers[i].setMap(null);
        }
        console.log("listMarkers", this.listMarkers);
        this.listMarkers = []
        console.log("listMarkers", this.listMarkers);
        //this.deleteMarkers(this.map, this.listMarkers);
      } 
    ) */

  }
}
