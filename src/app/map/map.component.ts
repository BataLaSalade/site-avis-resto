/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild} from '@angular/core';
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

  listResto: Resto[] = new Array<Resto>();

  map: google.maps.Map;
  listMarkers: google.maps.Marker[] = []
  userLocation: any;
  userMarker:string = "../../assets/img/1x/userFichier 2.png";
  restoMarker: string = "../../assets/img/1x/restoFichier4.png";
  
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

  addRestoMarkers(listResto: Resto[], listMarkers: google.maps.Marker[]) {
    let index: number;
    for (index = 0; index< listResto.length; index++) {
      let marker = new google.maps.Marker({
        position: listResto[index].geometry.location,
        icon: this.restoMarker,
        title: listResto[index].name
      });
      listMarkers.push(marker)
    }
  }

  setMapOnAll(map: google.maps.Map, listMarkers: google.maps.Marker[]) {
    for (var i = 0; i < listMarkers.length; i++) {
      listMarkers[i].setMap(map);
    }
  }

  ngOnInit() {
    this.initMap();

    this.placeService.restoSubject$.subscribe(
      places => {
        this.listResto = places;
        this.addRestoMarkers(this.listResto, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
      }
    )

    this.placeService.filteredRestoSubject$.subscribe(
      places => {
        this.listResto = places;
        for (var i = 0; i < this.listMarkers.length; i++) {
          this.listMarkers[i].setMap(null);
        }
        this.listMarkers = [];
        this.addRestoMarkers(this.listResto, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
      }
    )
  }
}
