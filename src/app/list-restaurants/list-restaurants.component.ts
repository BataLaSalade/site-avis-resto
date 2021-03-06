import { Component, OnInit } from '@angular/core';
import { Resto } from "../model/Resto";
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
},)

export class ListRestaurantsComponent implements OnInit{
  constructor(private placesService: PlacesService) {}

  listResto: Resto[];
  selectedResto: Resto;
  
  getBkgImgURL(ratingScore:number, starIndex:number){
    let starURL: string = "../../assets/img/1x/";
    let currentRate: number = ratingScore - starIndex;
    let endURL = "emptyStar.png";

    if(currentRate >= 0.75) {
      endURL = "filledStar.png";
    } else if(currentRate >= 0.25) {
      endURL ="halfStar.png";
    }

    return starURL + endURL;
  }

  getUrlPhotoRequest(resto: any) {
    if (typeof resto.photos == "undefined") {
        let defaultImg: string = "../../assets/img/1x/default.jpg";
        return defaultImg;
    } else {
        return resto.photos[0].getUrl()
      }  
  }

  onSelect(resto: Resto){
    this.placesService.selectedRestoSubject$.next(resto);
    this.placesService.isSelectedResto$.next(true);
  }
  
  ngOnInit() {
    this.placesService.restoSubject$.subscribe(
      places => this.listResto = places
    );
    
    this.placesService.filteredRestoSubject$.subscribe(
      places => this.listResto = places
    );
  }
}