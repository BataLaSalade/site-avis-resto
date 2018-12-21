import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ListResto } from "../mock-resto";
import { Resto } from '../model/Resto';
import { RestoService } from "../resto.service";
import { UserService } from "../user.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  /*userPosition: User = { lat: 43.475721, long: 5.378782, label: "M"};
  lat: number = this.userPosition.lat;
  lng: number = this.userPosition.long;
  label: string = this.userPosition.label;
  zoom: number = 8;*/
  lat: number;
  lng: number;
  label: string;
  zoom: number = 8;

  listResto: Resto[];
  getListResto(): void {
    this.listResto = this.restoService.getListResto();
  }

  refreshUserPosition() {
    this.userService.getUserPosition(this.success.bind(this), this.error)
  }
  
  success(position) {
    var coords = position.coords;
    if(coords != null && coords.latitude != null) {
      this.lat = coords.latitude;
      this.lng = coords.longitude;
      this.label = "M";
      console.log('Votre position actuelle etait :');
      console.log(`Latitude : ${coords.latitude}`);
      console.log(`Longitude : ${coords.longitude}`);
      console.log(`La précision est de ${coords.accuracy} mètres.`);
    }
  }

  error(error) {
    console.warn(`ERREUR (${error.code}): ${error.message}`)
  }

  
  
  constructor(
    private restoService: RestoService,
    private userService: UserService) { }

  ngOnInit() {
    this.getListResto();
    this.refreshUserPosition();
  }

}
