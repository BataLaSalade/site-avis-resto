/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";
//import {} from 'googlemaps'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor(private userService: UserService) {}

  @ViewChild('map') mapElement: any;

  @Input() listResto: Resto[];

  map: google.maps.Map;
  userLat: number;
  userLong: number;
  userMarker:string;
  zoom: number = 15;
  restoMarker: string;
  //let response = this.http.get<Response>('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.629067899999995,5.0836215&radius=1500&type=restaurant&key=AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM')
  
  mapProperties = {
    center: new google.maps.LatLng( 43.629067899999995, 5.0836215),
    zoom: this.zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  setRestoMarker() {
    this.restoMarker = "../../assets/img/1x/restoFichier4.png";
  }

  refreshUserPosition() {
    this.userService.getUserPosition(this.success.bind(this), this.error);
  }
  
  success(position) {
    var coords = position.coords;
    if(coords != null && coords.latitude != null) {
      this.userLat = coords.latitude;
      this.userLong = coords.longitude;
      this.userMarker = "../../assets/img/1x/userFichier 2.png";
    }
  }

  error(error) {
    console.warn(`ERREUR (${error.code}): ${error.message}`);
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties)
  }

  ngOnInit() {
    this.setRestoMarker();
    this.refreshUserPosition();
    this.initMap();
  }
}
