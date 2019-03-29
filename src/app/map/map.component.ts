import { Component, OnInit } from '@angular/core';
import { Resto } from '../model/Resto';
import { RestoService } from "../services/resto.service";
import { UserService } from "../services/user.service";
//import {} from "googlemaps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  userLat: number;
  userLong: number;
  userMarker:string;
  zoom: number = 15;

  restoMarker: string;

  listResto: Resto[];
  
  constructor(
    private restoService: RestoService,
    private userService: UserService
  ) { }

  setListResto(): void {
    this.restoService.getListResto()
      .subscribe(listResto => this.listResto = listResto);
    this.restoMarker = "../../assets/img/1x/restoFichier4.png"
  }

  refreshUserPosition() {
    this.userService.getUserPosition(this.success.bind(this), this.error)
  }
  
  success(position) {
    var coords = position.coords;
    if(coords != null && coords.latitude != null) {
      this.userLat = coords.latitude;
      this.userLong = coords.longitude;
      this.userMarker = "../../assets/img/1x/userFichier 2.png";
      console.log('Votre position actuelle est :');
      console.log(`Latitude : ${coords.latitude}`);
      console.log(`Longitude : ${coords.longitude}`);
      console.log(`La précision est de ${coords.accuracy} mètres.`);
    }
  }

  error(error) {
    console.warn(`ERREUR (${error.code}): ${error.message}`)
  }

  ngOnInit() {
    this.setListResto();
    this.refreshUserPosition();
  }

}
