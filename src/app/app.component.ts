import { Component, OnInit } from '@angular/core';
import { RestoService } from '../app/services/resto.service';
import { Resto } from './model/Resto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private restoService: RestoService){}

  listResto: Resto[];
  filteredListResto: Resto[];
  isShowError: boolean = false;
  minSelectedValue: string = "0";
  maxSelectedValue: string = "5";

  listRestoObservable = this.restoService.getListResto();

  setListResto(): void {
    this.listRestoObservable.subscribe(
      listResto => {
          this.listResto = listResto;
          this.filteredListResto = listResto;
          console.log("from appComponent",this.listResto);
      }
    )
  }

  onMinSelectEventChange(minSelectedValue) {
    this.minSelectedValue = minSelectedValue;
    this.displayFilteredListResto(this.minSelectedValue, this.maxSelectedValue);
  }

  onMaxSelectEventChange(maxSelectedValue) {
    this.maxSelectedValue = maxSelectedValue;
    this.displayFilteredListResto(this.minSelectedValue, this.maxSelectedValue);
  }

  onDiscardFilterEventChange() {
    this.filteredListResto = this.listResto;
  }

  displayFilteredListResto(minSelectedValue: string, maxSelectedValue: string) {
    let minValue: number = Number(minSelectedValue);
    let maxValue:number = Number(maxSelectedValue);
    if (minValue >= 0 && maxValue <= 5) {
        this.filteredListResto = this.listResto.filter(
          (resto: any) => resto.rating >= minValue && resto.rating <= maxValue
        );
        this.isShowError = (this.filteredListResto.length == 0) ? true : false;
    } else {
        this.filteredListResto = this.listResto;
    }
}

  ngOnInit(){
    this.setListResto()
  }
}
