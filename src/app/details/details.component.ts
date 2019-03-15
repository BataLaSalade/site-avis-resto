import { Component, OnInit, Input } from '@angular/core';
import { Resto } from "../model/Resto";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() resto: any;
  @Input() isShow: boolean;
  @Input() selectedResto;

  constructor() { }

  /* showList() {
    console.log("coucou from Details")
    this.resto.name = "toto";
    this.isShow = true;
    console.log("toto")
  } */
  coucou(){
    console.log("FROM DETAIL : " + this.isShow)
  }

  ngOnInit() {
    //console.log("FROM DETAIL : " + this.isShow)
  }

}
