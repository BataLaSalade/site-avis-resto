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
  filteredListResto: Resto[] = new Array<Resto>();

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

  getAddressFromClick(event, dialogResults, placeService, listResto) {
    this.geocoder = new google.maps.Geocoder();
    let address: string;
    this.geocoder.geocode({
      location: event.latLng
    }, function(results, status){
      if(status == google.maps.GeocoderStatus.OK) {
        if(results[0]) {
          address = results[0].formatted_address;
          let geometry = new Geometry();
          geometry.location = event.latLng;
          let newResto: Resto = new Resto(dialogResults.restoName, address, geometry, dialogResults.note);
          listResto.push(newResto);
          placeService.setListResto(listResto);
          //placeService.setFilteredListResto(listResto);
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
      this.getAddressFromClick(event, dialogResult, this.placeService, this.listResto);
    });
  }

  ngOnInit() {
    this.initMap();

    this.placeService.restoSubject$.subscribe(
      places => {
        this.listResto = places;
        console.log("***** this.placeService.restoSubject$ ******");
        console.log(" Resto ",this.listResto);
        console.log("markers ",this.listMarkers);
        for (var i = 0; i < this.listMarkers.length; i++) {
          this.listMarkers[i].setMap(null);
        }
        this.listMarkers = [];
        this.addRestoMarkers(this.listResto, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
        console.log("markers ",this.listMarkers);
      }
    )

    this.placeService.filteredRestoSubject$.subscribe(
      places => {
        this.filteredListResto = places;
        console.log("***** this.placeService.filteredRestoSubject$ ******");
        console.log(this.filteredListResto);
        console.log(this.listMarkers);
        for (var i = 0; i < this.listMarkers.length; i++) {
          this.listMarkers[i].setMap(null);
        }
        this.listMarkers = [];
        this.addRestoMarkers(this.filteredListResto, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
        console.log(this.listMarkers);
      }
    )
  }
}
