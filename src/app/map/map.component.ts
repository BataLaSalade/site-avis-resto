/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";
import { PlacesService } from '../services/places.service';
import { MatDialog } from '@angular/material';
import { NewRestoDialogComponent } from '../new-resto-dialog/new-resto-dialog.component';

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
  userMarker:string = "../../assets/img/1x/userFichier 2.png";
  restoMarker: string = "../../assets/img/1x/restoFichier4.png";
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
        icon: this.userMarker,
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

  getAddressFromClick(event, dialogResults, listResto) {
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
          let newResto: Resto = new Resto(dialogResults.restoName, address, event.latLng, dialogResults.note);
          console.log("newResto - ", newResto);
          console.log("nb resto avant - ", listResto.length);
          listResto.push(newResto);
          console.log("nb resto avant - ", listResto.length);
          console.log("listResto - ", listResto);

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
      console.log("the Resto dialog was closed");
      console.log("this.listResto", this.listResto);
      this.getAddressFromClick(event, dialogResult, this.listResto);
    });
  }

  ngOnInit() {
    this.initMap();

    this.placeService.restoSubject$.subscribe(
      places => {
        this.listResto = places;
        console.log("***** this.placeService.restoSubject$ ******");
        console.log(this.listResto);
        this.addRestoMarkers(this.listResto, this.listMarkers);
        this.setMapOnAll(this.map, this.listMarkers);
      }
    )

    this.placeService.filteredRestoSubject$.subscribe(
      places => {
        this.listResto = places;
        console.log("***** this.placeService.filteredRestoSubject$ ******");
        console.log(this.listResto);
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
