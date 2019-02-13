import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";
import { RestoStars} from '../model/RestoStars';
import { Star } from "../model/Star"

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})



export class ListRestaurantsComponent implements OnInit{

  styleStarObj = {
    backgroundImage: "url('../../assets/img/1x/emptyStar.png')"
  }
  
  AllStars: RestoStars[]

  emptyStar: string = '../../assets/img/1x/emptyStar.png';
  listResto: Resto[];
  resto:Resto;

  id: number;
  
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
          //let elem = document.getElementById(String(this.id));
          let previousStarID = this.id-1;
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

  createAllRestoStar(listResto: Resto[]){
    let allStars=[];
    var id: number = 0;
    for (const resto of listResto) {
      var listOfStarForOneResto = [];
      var number: number;
      for ( number = 1; number <= 5; number++) {
        id+=1;
        let currentStar = new Star();
        currentStar.init(id, number)
        listOfStarForOneResto.push(currentStar);
        console.log("id: "+currentStar.id+" number: "+currentStar.starNumber+ " bkg: " + currentStar.backgroundImageURL );
      }
      allStars.push(listOfStarForOneResto)
    }
    console.log(allStars);
  }
  listOfStarId = []
  createListOfStarId() {
    const numberOfStar = 5;
    let id: number;

    for (id = 1; id <= (this.listResto.length*numberOfStar); id++) {
      this.listOfStarId.push(id);
    }
    console.log(this.listOfStarId)
  }

  getId(){
    let splicedID = this.listOfStarId.splice(0,1);
    let id = splicedID[0];
    console.log(id);
    this.id = id;
    return this.id
  }

  listRestoObservable = this.restoService.getListResto();
  setListResto(): void {
    this.listRestoObservable
      .subscribe(listResto => this.listResto = listResto);
  }
  

  ngOnInit() {
    this.setListResto();
    this.getResto();
    //this.createAllRestoStar(this.listResto)
    this.createListOfStarId()
    //this.getId()
    
  }
  ngAfterViewInit(){
    //this.setStarRatingSection(this.resto.rating);
  }

}
