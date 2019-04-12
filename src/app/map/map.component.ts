/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges} from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnChanges {
  constructor(
    private userService: UserService,
    private placeService: PlacesService) {}

  @ViewChild('map') mapElement: any;

  @Input() listResto: Resto[];
  @Input() map: google.maps.Map;

  @Output() mapChanged: EventEmitter<Object> = new EventEmitter<Object>()

  userMarker:string = "../../assets/img/1x/userFichier 2.png";
  zoom: number = 15;
  restoMarker: string = "../../assets/img/1x/restoFichier4.png";
  userLocation: any;
  
  mapProperties = {
    center: new google.maps.LatLng(43.629067899999995, 5.0836215),
    zoom: this.zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      this.userService.userSubject$.next(location);
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.userLocation = location;
      var marker = new google.maps.Marker({
        position: {lat: location.coords.latitude, lng: location.coords.longitude},
        icon: this.userMarker,
        map: map
      });
      this.placeService.setMap(map)
      //this.mapChanged.emit({ map: this.map, userLocation: this.userLocation });
    });
  }

  ngOnInit() {
    this.initMap()
    console.log("listResto - ngOnInit - MAP-COMPO",this.listResto);
    this.userService.userSubject$.subscribe(
      userPosition => console.log("subscribe to UserPositionSubject = ", userPosition)
      
    )
  }

  ngOnChanges() {
    console.log("listResto - ngOnChange - MAP-COMPO",this.listResto);
  }
}
