/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
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

  @Output() mapEvent: EventEmitter<any> = new EventEmitter()

  map: any;
  userLat: number;
  userLong: number;
  userMarker:string;
  zoom: number = 15;
  restoMarker: string;
  service: any;
  //let response = this.http.get<Response>('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.629067899999995,5.0836215&radius=1500&type=restaurant&key=AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM')
  
  mapProperties = {
    center: new google.maps.LatLng(43.629067899999995, 5.0836215),
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

  onMapReady(e) {
    google.maps.event.addListenerOnce(this.map, 'idle', function(){
      console.log(e);
      console.log(this.mapElement.nativeElement);
      console.log(this.map)
    })
    
    
  }
  initMap() {
    console.log(this.mapElement.nativeElement)
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties)
    console.log(this.map)
    /*var service = new google.maps.places.PlacesService(map);
    console.log(service);
    service.nearbySearch(this.request, this.callback); */

  }
  
   /* getPlaces() {
    this.service = new google.maps.places.PlacesService(this.map);
    this.service.nearbySearch({
      location: {lat: 43.629067899999995, lng: 5.0836215},
      radius: 1000,
      type: ['restaurant']
    }, (results,status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log ("coucou", results);
      }
    });
   } */
 
  ngOnInit() {
    this.setRestoMarker();
    this.refreshUserPosition();
    this.initMap()
    
  }
}
