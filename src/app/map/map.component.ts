/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges} from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";
import { PlacesService } from '../services/places.service';
import { Location } from '../model/Location';
import { zip } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor(
    private userService: UserService,
    private placeService: PlacesService) {}

  @ViewChild('map') mapElement: any;

  listResto: Resto[] = new Array<Resto>();
  listRestoLocation: Array<Location> = new Array<Location>();
  userMarker:string = "../../assets/img/1x/userFichier 2.png";
  zoom: number = 15;
  restoMarker: string = "../../assets/img/1x/restoFichier4.png";
  userLocation: any;

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var marker = new google.maps.Marker({
        position: {lat: location.coords.latitude, lng: location.coords.longitude},
        icon: this.userMarker,
        map: map
      });
      this.placeService.setMap(map);
      this.userService.userSubject$.next(location);
    });
  }

  addRestoMarkers(listResto: Resto[], map: google.maps.Map) {
    let index: number;
    for (index = 0; index< listResto.length; index++) {
      let marker = new google.maps.Marker({
        position: listResto[index].geometry.location,
        icon: this.restoMarker,
        map: map
      });
    }
  }

  ngOnInit() {
    this.initMap();
    zip(this.placeService.restoSubject$, this.placeService.mapSubject$).subscribe(
      markerParams => {
        let listResto = markerParams[0];
        let map = markerParams[1];
        this.addRestoMarkers(listResto, map);
      } 
    )
  }
}
