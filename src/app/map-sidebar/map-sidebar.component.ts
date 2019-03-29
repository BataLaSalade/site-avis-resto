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
    selectedResto: any;
    listResto: Resto[];
    listRestoObservable = this.restoService.getListResto();
    
    constructor(private restoService: RestoService) {}

    setListResto(): void{
        this.listRestoObservable
            .subscribe(listResto => this.listResto = listResto);
    }

    toggleListDetail() {
        this.isShowDetails = !this.isShowDetails;
    }

    onRestoEmission(resto) {
        this.isShowDetails = typeof resto != "undefined";
        this.selectedResto = resto
    }

    ngOnInit(): void {
        this.setListResto()
    }

  }