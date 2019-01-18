import { Component, OnInit } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";
//import { ListResto } from "../mock-resto";

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent implements OnInit {
  star = '../../assets/img/1x/emptyStar.png'
  //listResto = ListResto
  listResto: Resto[];
  
  setListResto(): void {
    this.listResto = this.restoService.getListResto();
  }
  constructor(private restoService: RestoService) {}

  ngOnInit() {
    this.setListResto();
  }

}
