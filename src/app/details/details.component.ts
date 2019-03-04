import { Component, OnInit, Input } from '@angular/core';
import { Resto } from "../model/Resto";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() resto: Resto;


  constructor() { }

  showList() {
    console.log("coucou from Details")
  }

  ngOnInit() {
  }

}
