import { Component, OnInit, Input } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() resto: Resto;
  //restoObservable = this.restoService.getResto();

  constructor(/*private restoService: RestoService*/) { }

  /*getResto(): void{
    this.restoObservable
      .subscribe(resto => this.resto = resto);
  }*/
  ngOnInit() {
  }

}
