import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html',
    styleUrls: ['./map-sidebar.component.scss']
  },)

  export class MapSidebarComponent implements OnInit {
    constructor(private restoService: RestoService) {}

    @Input() disabled: boolean = true;
    @Input() isShowError: boolean ;
    @Input() listResto: Resto[];
    @Input() filteredListResto: Resto[];

    @Output() minSelectEvent: EventEmitter<any> = new EventEmitter();
    @Output() maxSelectEvent: EventEmitter<any> = new EventEmitter();
    @Output() discardFilterEvent: EventEmitter<any> = new EventEmitter();

    isShowDetails: boolean = false;
    emptyStar: string = '../../assets/img/1x/emptyStar.png';
    selectedResto: any;
    index: string[] = ["0", "1", "2", "3", "4", "5"];
    selectedMin: string = "0";
    selectedMax: string =  "5";

    listRestoObservable = this.restoService.getListResto();

    onMinRateSelectionChange() {
        this.disabled = false;
        this.minSelectEvent.emit(this.selectedMin);
    }

    onMaxRateSelectionChange() {
        this.disabled = false;
        this.maxSelectEvent.emit(this.selectedMax);
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
        this.isShowError = false;
        this.disabled = true;
        this.discardFilterEvent.emit();
    }

    toggleListDetail() {
        this.isShowDetails = !this.isShowDetails;
    }

    ngOnInit() {
    }

  }