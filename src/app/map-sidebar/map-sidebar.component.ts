import { Component, OnInit} from '@angular/core';
import { Resto } from "../model/Resto";
import { PlacesService } from '../services/places.service';
import { FilterService } from '../services/filter.service';

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html',
    styleUrls: ['./map-sidebar.component.scss']
  },)

  export class MapSidebarComponent implements OnInit {
    constructor(
        private placesService: PlacesService,
        private filterService: FilterService) {}

    disabled: boolean = true;
    isShowError: boolean = false;
    isShowDetails: boolean;

    listResto: Resto[] = new Array<Resto>()
    filteredListResto: Resto[] = new Array<Resto>()
    //selectedResto: Resto = new Resto();
    
    emptyStar: string = '../../assets/img/1x/emptyStar.png';
    index: string[] = ["0", "1", "2", "3", "4", "5"];
    selectedMin: string = "0";
    selectedMax: string =  "5";

    onMinRateSelectionChange() {
       this.filterService.setMinValue(this.selectedMin);
       this.disabled = false;
    }

    onMaxRateSelectionChange() {
        this.filterService.setMaxValue(this.selectedMax);
        this.disabled = false;
    }

    discardFilter() {
        this.selectedMin = "0";
        this.selectedMax = "5";
        this.filterService.setMinValue(this.selectedMin);
        this.filterService.setMaxValue(this.selectedMax);
        this.disabled = true;
    }

    backToList() {
        this.isShowDetails = !this.isShowDetails;
    }

    displayFilteredListResto(minSelectedValue: string, maxSelectedValue: string) {
        let minValue: number = Number(minSelectedValue);
        let maxValue:number = Number(maxSelectedValue);
        let arrayOfUndefined = this.listResto.filter(
            (resto: Resto) => typeof resto.rating == 'undefined'
        );
        console.log("arrayOfUndefined - MapSideBar Compo= ", arrayOfUndefined);
        if (minValue >= 0 && maxValue <= 5) {
            this.filteredListResto = this.listResto.filter(
                (resto: any) => resto.rating >= minValue && resto.rating <= maxValue
            ).concat(arrayOfUndefined);
            console.log("concat array = ", this.filteredListResto);
            this.placesService.setFilteredListResto(this.filteredListResto);
        }
    }

    ngOnInit() {
        this.placesService.restoSubject$.subscribe(
            places => {
                this.listResto = places;
            }
        );

        this.filterService.minSelect$.subscribe(
            value => {
                this.displayFilteredListResto(value, this.selectedMax);
            }
        );

        this.filterService.maxSelect$.subscribe(
            value => {
                this.displayFilteredListResto(this.selectedMin, value);
            }
        );

        this.placesService.isSelectedResto$.subscribe(
            isSelectedResto => this.isShowDetails = isSelectedResto
        )
        /* this.placesService.selectedRestoSubject$.subscribe(
            resto => {
                console.log("selectedResto - Sidebar = ", resto);
                this.isShowDetails = true;
                
                
            }
        ) */
    }

  }