import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";
import { $ } from 'protractor';

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})



export class ListRestaurantsComponent implements OnInit{

  styleStarObj = {
    backgroundImage: "url('../../assets/img/1x/emptyStar.png')"
  }
  emptyStar: string = '../../assets/img/1x/emptyStar.png';
  listResto: Resto[];
  resto:Resto;
  
  constructor(private restoService: RestoService) {}

  restoObservable = this.restoService.getResto();
  getResto(): void{
    this.restoObservable.subscribe(resto => this.resto = resto);
  }
  getBkgImgURL(ratingScore:number, starId:number, restoName:string){
    let starURL: string = "../../assets/img/1x/"
    let integerPartRate: number = Math.trunc(ratingScore);
    let decimalPartRate: number = ratingScore - integerPartRate;
    let numberOfStars: number;
    let completedStarURL: string;
    //for (starId = 1; starId<=5; starId++) {
      let elem = document.getElementById(String(starId));
      if (decimalPartRate>=0 && decimalPartRate<0.25) { // arrondi inf
        numberOfStars = Math.floor(ratingScore);
        return starURL += (starId<=numberOfStars) ? "filledStar.png" : "emptyStar.png";
        // TODO : Set URL
        //this.styleStarObj.backgroundImage = starURL;
      } else if (decimalPartRate>=0.75 && decimalPartRate<1) { // arrondi sup
        numberOfStars = Math.ceil(ratingScore);
        return starURL += (starId<=numberOfStars) ? "filledStar.png" : "emptyStar.png";
        // TODO : Set URL
        //this.styleStarObj.backgroundImage = starURL;
      } else if ((decimalPartRate>=0.25 && decimalPartRate<0.75)) { // halfStar setting
        if (starId<=ratingScore) {
          return starURL += "filledStar.png";
          //TODO : Set URL
          //this.styleStarObj.backgroundImage = starURL;
        } else {
          let previousStarID = starId-1;
          let previousStarElem = document.getElementById(String(previousStarID));
          let halfStarAbsolutePath = 'url("http://localhost:4200/assets/img/1x/halfStar.png")';
          let currentComputedStyle = window.getComputedStyle(previousStarElem).backgroundImage;
          let isAlreadyHalfStar = (currentComputedStyle === halfStarAbsolutePath);
          return starURL += isAlreadyHalfStar ? "emptyStar.png" : "halfStar.png";
          //TODO : Set URL
          //this.styleStarObj.backgroundImage = starURL;
        }
      }
    //}
  }

  listRestoObservable = this.restoService.getListResto();
  setListResto(): void {
    this.listRestoObservable
      .subscribe(listResto => this.listResto = listResto);
  }
  

  ngOnInit() {
    this.setListResto();
    this.getResto();
    
    
  }
  ngAfterViewInit(){
    //this.setStarRatingSection(this.resto.rating);
  }

}
