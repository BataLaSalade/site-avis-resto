/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";
import { PlacesService } from '../services/places.service';
import { MatDialog } from '@angular/material';
import { NewRestoDialogComponent } from '../new-resto-dialog/new-resto-dialog.component';
import { Geometry } from '../model/Geometry';

export interface DialogData {
  adress: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor(
    private userService: UserService,
    private placeService: PlacesService,
    private dialog: MatDialog,
    private ngZone: NgZone) {}

  @ViewChild('map') mapElement: any;

  listResto: Resto[] = new Array<Resto>();

  map: google.maps.Map;
  geocoder : google.maps.Geocoder;
  listMarkers: google.maps.Marker[] = []
  userLocation: any;
  newResto: Resto;
  address: string = "";
  test = "Je suis un test";

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      let map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.map = map;

      let marker = new google.maps.Marker({
        position: {lat: location.coords.latitude, lng: location.coords.longitude},
        icon: "../../assets/img/1x/userFichier 2.png",
        map: map
      });

      google.maps.event.addListener(map, 'click', (event) => {
        this.ngZone.run(() => {
          console.log("clickEvent --> ", event);
          
          this.openRestoDialog(event);
        });
      }
     );

      this.placeService.setMap(map);
      this.userService.userSubject$.next(location);
    });
  }

  addRestoMarkers(listResto: Resto[], listMarkers: google.maps.Marker[]) {
    let index: number;
    for (index = 0; index< listResto.length; index++) {
      let marker = new google.maps.Marker({
        position: listResto[index].geometry.location,
        icon: "../../assets/img/1x/restoFichier4.png",
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

  getAddressFromClick(event, dialogResults, listResto, listMarkers, map, addMarkerCompletion, setMarkersOnMapCompletion) {
    this.geocoder = new google.maps.Geocoder();
    let address: string;
    this.geocoder.geocode({
      location: event.latLng
    }, function(results, status){
      if(status == google.maps.GeocoderStatus.OK) {
        console.log("geoCoder results", results)
        if(results[0]) {
          address = results[0].formatted_address;
          console.log("adress = ", address);
          console.log("dialogResults - ", dialogResults);
          console.log("access to event - ", event);
          let geometry = new Geometry();
          geometry.location = event.latLng;
          let newResto: Resto = new Resto(dialogResults.restoName, address, geometry, dialogResults.note);
          console.log("newResto - ", newResto);
          console.log("nb resto avant - ", listResto.length);
          listResto.push(newResto);
          console.log("nb resto avant - ", listResto.length);
          console.log("listResto - ", listResto);
          console.log("listMarker - ", listMarkers);
          listMarkers = [];
          console.log("reset listMarker - ", listMarkers);
          addMarkerCompletion(listResto, listMarkers);
          console.log("listMarker - ", listMarkers);
          setMarkersOnMapCompletion(map, listMarkers);

        }
      }
    });
  }

  openRestoDialog(event): void {
    console.log("openDialog", event);
    
    const dialogRef = this.dialog.open(NewRestoDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(dialogResult =>{
      console.log("***** the Resto dialog was closed *****");
      console.log("this.listResto", this.listResto);
      console.log("this.listMarkers", this.listMarkers);
      this.getAddressFromClick(event, dialogResult, this.listResto, this.listMarkers, this.map, this.addRestoMarkers, this.setMapOnAll);
    });
  }

  ngOnInit() {
    this.initMap();

    this.placeService.restoSubject$.subscribe(
      places => {
        this.listResto = places;
        console.log("***** this.placeService.restoSubject$ ******");
        console.log(this.listResto);
        console.log(this.listMarkers);
        this.addRestoMarkers(this.listResto, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
      }
    )

    this.placeService.filteredRestoSubject$.subscribe(
      places => {
        this.listResto = places;
        console.log("***** this.placeService.filteredRestoSubject$ ******");
        console.log(this.listResto);
        console.log(this.listMarkers);
        for (var i = 0; i < this.listMarkers.length; i++) {
          this.listMarkers[i].setMap(null);
        }
        this.listMarkers = [];
        this.addRestoMarkers(this.listResto, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
        //console.log(this.listMarkers);
      }
    )
  }
}
