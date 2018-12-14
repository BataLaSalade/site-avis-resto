import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  userPosition: User = { lat: 43.475721, long: 5.378782, iconUrl: '../../assets/img/1x/outline_account_circle_white_18dp.png'}
  lat: number = this.userPosition.lat;
  lng: number = this.userPosition.long;
  iconUrl: string = this.userPosition.iconUrl;
  zoom: number = 8;
  
  
  constructor() { }

  ngOnInit() {
  }

}
