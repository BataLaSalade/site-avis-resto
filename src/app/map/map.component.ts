/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor(private userService: UserService) {}

  @ViewChild('map') mapElement: any;

  @Input() listResto: Resto[];
  @Input() map: google.maps.Map;

  @Output() mapChanged: EventEmitter<Object> = new EventEmitter<Object>()

  
  userMarker:string;
  zoom: number = 15;
  restoMarker: string;
  userLocation: any;
  
  mapProperties = {
    center: new google.maps.LatLng(43.629067899999995, 5.0836215),
    zoom: this.zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  setMarker() {
    this.restoMarker = "../../assets/img/1x/restoFichier4.png";
    this.userMarker = "../../assets/img/1x/userFichier 2.png";
  }

  

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.userLocation = location;
      this.mapChanged.emit({map: this.map, userLocation: this.userLocation});
    });
    
  }

  ngOnInit() {
    this.setMarker();
    this.initMap()
  }
}
