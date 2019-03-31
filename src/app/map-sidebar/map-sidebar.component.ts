import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";
import { filter, map } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html',
    styleUrls: ['./map-sidebar.component.scss']
  },)

  export class MapSidebarComponent implements OnInit {
    
    isShowDetails: boolean = false;
    emptyStar: string = '../../assets/img/1x/emptyStar.png';
    selectedResto: any;
    listResto: Resto[];
    filteredListResto: Resto[];
    listRestoObservable = this.restoService.getListResto();
    
    /*setting filter*/
    index: string[] = ["0", "1", "2", "3", "4", "5"];
    selectedMin: string;
    selectedMax: string;
    

    constructor(private restoService: RestoService, private cdRef: ChangeDetectorRef) {}

    minRateSelectionChange(e: any) {
        console.log(e);
        console.log("selectedMin = ",Number(this.selectedMin));
        console.log(this.listResto)
    }

    maxRateSelectionChange(e: any) {
        console.log(e);
        console.log("selectedMax = ",Number(this.selectedMax));
    }

    setFilteredListResto(): void{
        this.listRestoObservable.pipe(
            map((list: any[]) => {
                if ((typeof this.selectedMin == "undefined" && typeof this.selectedMax == "undefined") ||(this.selectedMin == "noFilter" && this.selectedMax == "noFilter")) {
                    return list
                } else if (this.selectedMin != "noFilter" && this.selectedMax != "noFilter"){
                    return list.filter(
                        (item: any) => item.rating > Number(this.selectedMin) && item.rating < Number(this.selectedMax)
                    )
                }
            })
        )
        .subscribe(listResto => {
            console.log("SelectedMin = ", this.selectedMin);
            console.log("SelectedMax = ", this.selectedMax);
            console.log("setListResto");
            this.listResto = listResto;
            console.log(listResto);
            
        });
    }

    setListResto(): void {
        this.listRestoObservable.subscribe(
            listResto => this.listResto = listResto
        )
    }

    toggleListDetail() {
        this.isShowDetails = !this.isShowDetails;
    }

    onRestoEmission(resto) {
        this.isShowDetails = typeof resto != "undefined";
        this.selectedResto = resto
    }

    ngOnInit(): void {
        //this.setListResto();
        this.setFilteredListResto();
    }

  }