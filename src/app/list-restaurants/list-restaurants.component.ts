import { Component, OnInit } from '@angular/core';
import { ListResto } from "../mock-resto";
@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent implements OnInit {

    listResto = ListResto

  
  constructor() { }

  ngOnInit() {
  }

}
