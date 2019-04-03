import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Resto } from "../model/Resto";

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
},)

export class ListRestaurantsComponent implements OnInit{
  constructor() {}

  @Input() listResto: Resto[];
  @Input() isShowDetails: boolean;

  @Output() RestoEmitter: EventEmitter<any> = new EventEmitter;
  @Output() listChange: EventEmitter<any> = new EventEmitter;

  selectedResto: Resto;
  
  getBkgImgURL(ratingScore:number, starIndex:number){
    let starURL: string = "../../assets/img/1x/";
    let currentRate: number = ratingScore - starIndex;
    let endURL = "emptyStar.png";

    if(currentRate >= 0.75) {
      endURL = "filledStar.png";
    }
    else if(currentRate >= 0.25) {
      endURL ="halfStar.png";
    }

    return starURL + endURL;
  }

  getUrlPhotoRequest(resto: any) {
    if (typeof resto.photos == "undefined") {
        let defaultImg: string = "../../assets/img/1x/emptyStar.png";

        return defaultImg;
    } else {
        let photoReference: string = resto.photos[0].photo_reference;
        
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=80&photoreference=${photoReference}&key=AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM`;
    }  
  }

  onListChange(newList) {
    this.listResto = newList;
    this.listChange.emit(this.listResto);
  }

  onSelect(resto: Resto){
    this.selectedResto = resto;
    this.RestoEmitter.emit(this.selectedResto);
  }
  
  ngOnInit() {
  }

}
