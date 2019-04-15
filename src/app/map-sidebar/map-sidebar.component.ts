import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";
import { PlacesService } from '../services/places.service';
import { FilterService } from '../services/filter.service';
import { zip } from 'rxjs';

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html',
    styleUrls: ['./map-sidebar.component.scss']
  },)

  export class MapSidebarComponent implements OnInit {
    constructor(private restoService: RestoService, private placesService: PlacesService, private filterService: FilterService) {}

    disabled: boolean = true;
    @Input() isShowError: boolean ;
    
    //@Input() filteredListResto: Resto[];

    
    //discardFilter$: BehaviorSubject<any> = new BehaviorSubject<any>({});

    listResto: Resto[] = new Array<Resto> ()
    isShowDetails: boolean = false;
    emptyStar: string = '../../assets/img/1x/emptyStar.png';
    selectedResto: Resto = new Resto();
    index: string[] = ["0", "1", "2", "3", "4", "5"];
    selectedMin: string = "0";
    selectedMax: string =  "5";

    listRestoObservable = this.restoService.getListResto();

    onMinRateSelectionChange() {
       this.filterService.setMinValue(this.selectedMin);
       this.disabled = false;
       console.log("min value change = ", this.selectedMin, this.disabled);
    }

    onMaxRateSelectionChange() {
        this.filterService.setMaxValue(this.selectedMax);
        this.disabled = false;
        console.log("max value change = ", this.selectedMax, this.disabled);
    }

    onRestoChange(resto) {
        this.isShowDetails = typeof resto != "undefined";
        this.selectedResto = resto;
    }

    getRatingRange(rating: number) {
        return rating >= 0 && rating <= 5;
    }

    discardFilter() {
        this.selectedMin = "0";
        this.selectedMax = "5";
        this.filterService.setMinValue(this.selectedMin);
        this.filterService.setMaxValue(this.selectedMax);
        //this.isShowError = false;
        this.disabled = true;
        console.log("discardFilter() = ",this.selectedMin, this.selectedMax,  "isShowError = ", this.isShowError, "disabled = ", this.disabled)
    }

    toggleListDetail() {
        this.isShowDetails = !this.isShowDetails;
    }

    ngOnInit() {
        this.placesService.restoSubject$.subscribe(
            places => this.listResto = places
        )
        
        zip(this.filterService.minSelect$, this.filterService.maxSelect$).subscribe(
            selectedValues => {
                this.selectedMin = selectedValues[0];
                this.selectedMax = selectedValues[1];
                this.disabled = false;
            }
        )
    }

  }