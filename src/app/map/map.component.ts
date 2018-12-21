import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ListResto } from "../mock-resto";
import { Resto } from "../model/Resto";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  userPosition: User = { lat: 43.475721, long: 5.378782, label: "M"};
  lat: number = this.userPosition.lat;
  lng: number = this.userPosition.long;
  label: string = this.userPosition.label;
  zoom: number = 8;
  
  listResto = ListResto;
  
  
  
  constructor() { }

  ngOnInit() {
  }

}
