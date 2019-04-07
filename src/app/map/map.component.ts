import { Component, OnInit, Input } from '@angular/core';
import { Resto } from '../model/Resto';
import { UserService } from "../services/user.service";
import {} from 'googlemaps'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  constructor(private userService: UserService) {}

  @Input() listResto: Resto[];

  userLat: number;
  userLong: number;
  userMarker:string;
  zoom: number = 15;
  restoMarker: string;

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

  }

  ngOnInit() {
    this.setRestoMarker();
    this.refreshUserPosition();
  }
}
