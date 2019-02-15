import { Component, OnInit } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})

export class ListRestaurantsComponent implements OnInit{

  emptyStar: string = '../../assets/img/1x/emptyStar.png';
  listResto: Resto[];
  resto:Resto;
  restoObservable = this.restoService.getResto();
  listRestoObservable = this.restoService.getListResto();

  constructor(private restoService: RestoService) {}

  getResto(): void{
    this.restoObservable
      .subscribe(resto => this.resto = resto);
  }

  getListResto(): void {
    this.listRestoObservable
      .subscribe(listResto => this.listResto = listResto);
  }

  getBkgImgURL(ratingScore:number, starIndex:number){
    let starURL: string = "../../assets/img/1x/";
    let currentRate: number = ratingScore - starIndex;
    let resultPng = "emptyStar.png";

    if(currentRate >= 0.75) {
      resultPng = "filledStar.png"
    }
    else if(currentRate >= 0.25) {
      resultPng ="halfStar.png"
    }

    return starURL + resultPng
  }

  getUrlPhotoRequest(resto: Resto) {
    if (typeof resto.photos == "undefined") {
      let defaultImg: string = "../../assets/img/1x/emptyStar.png";
      return defaultImg;
    } else {
      let firstPart: string = "https://maps.googleapis.com/maps/api/place/photo"
      let maxWidthKey: string = "?maxwidth=";
      let maxWidthValue: string = "80";
      let photoReferenceKey: string = "&photoreference=";
      let photoReferenceValue: string = resto.photos[0].photo_reference;
      let keyKey: string = "&key=";
      let keyValue: string = "AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM";
      let url: string = firstPart+maxWidthKey+maxWidthValue+photoReferenceKey+photoReferenceValue+keyKey+keyValue    
      return url;
    }  
  }

  ngOnInit() {
    this.getListResto();
  }

}
