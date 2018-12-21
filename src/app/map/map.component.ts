import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ListResto } from "../mock-resto";
import { Resto } from '../model/Resto';
import { RestoService } from "../resto.service";

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
  
  listResto: Resto[];
  getListResto(): void {
    this.listResto = this.restoService.getListResto();
  }
  
  
  
  constructor(private restoService: RestoService) { }

  ngOnInit() {
    this.getListResto();
  }

}
