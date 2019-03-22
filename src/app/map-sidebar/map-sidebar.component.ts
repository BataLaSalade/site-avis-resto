import { Component, OnInit, Input } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";
import {ListResto} from "../../assets/data/getResto"

@Component({
    selector: 'app-map-sidebar',
    templateUrl: './map-sidebar.component.html',
    styleUrls: ['./map-sidebar.component.scss']
  },)

  export class MapSidebarComponent implements OnInit{
    
    isShowDetails: boolean = false;
    emptyStar: string = '../../assets/img/1x/emptyStar.png';
    listResto: Resto[] = ListResto;
    restoObservable = this.restoService.getResto();
    listRestoObservable = this.restoService.getListResto();
    selectedResto: any
    
    constructor(private restoService: RestoService) {}

    toggleListDetail() {
        this.isShowDetails = !this.isShowDetails;
    }

    onCurrentRestoChange(resto) {
        console.log("coucou from resto2 = " + resto)
        this.isShowDetails = typeof resto != "undefined";
        this.selectedResto = resto
    }

    ngOnInit(): void {
        console.log("coucou from parent = " + this.isShowDetails)
    }

  }