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

export class MapComponent implements OnInit {
  constructor(
    private userService: UserService,
    private placeService: PlacesService) {}

  @ViewChild('map') mapElement: any;

  listResto: Resto[];
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

  ngOnInit() {
    this.initMap();
    this.placeService.restoSubject$.subscribe(
      places => {
        console.log("///// Map Component /////");
        console.log("===== PLACES SUBSCRIPTION =====");
        console.log(places);
        console.log(places[0])
        console.log("===============================");
        this.listResto = places;
        //this.filteredListResto = places;
        console.log("===== LIST OF RESTO =====");
        console.log(this.listResto);
        //console.log(this.filteredListResto);
        console.log("===============================");
      }
    )
  }
}
