import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html',
    styleUrls: ['./map-sidebar.component.scss']
  },)

  export class MapSidebarComponent implements OnInit {
    
    isShowDetails: boolean = false;
    isShowError: boolean = false;
    emptyStar: string = '../../assets/img/1x/emptyStar.png';
    selectedResto: any;
    listResto: Resto[];
    filteredListResto: Resto[];
    listRestoObservable = this.restoService.getListResto();
    
    /*setting filter*/
    index: string[] = ["0", "1", "2", "3", "4", "5"];
    selectedMin: string = "0"
    selectedMax: string =  "5"
    
    @Input() disabled: boolean = true;
    

    constructor(private restoService: RestoService, private cdRef: ChangeDetectorRef) {}

    minRateSelectionChange(e: any) {
        this.displayFilteredListResto(this.selectedMin, this.selectedMax);
        this.disabled = false;
    }

    maxRateSelectionChange(e: any) {
        this.displayFilteredListResto(this.selectedMin, this.selectedMax);
        this.disabled = false;
    }

    getRatingRange(rating: number) {
        return rating >= 0 && rating <= 5;
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

    discardFilter() {
        this.selectedMin = "0";
        this.selectedMax = "5";
        this.isShowError = false;
        this.filteredListResto = this.listResto;
        this.disabled = true;
        console.log(this.filteredListResto)
    }

    setListResto(): void {
        this.listRestoObservable.subscribe(
            listResto => {
                this.listResto = listResto;
                this.filteredListResto = listResto;
            }
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
        this.setListResto();
    }

  }