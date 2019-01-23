import { Component, OnInit } from '@angular/core';
import { RestoService } from "../services/resto.service";
import { Resto } from "../model/Resto";

@Component({
  selector: 'app-list-restaurants',
  templateUrl: './list-restaurants.component.html',
  styleUrls: ['./list-restaurants.component.scss']
})
export class ListRestaurantsComponent implements OnInit{

  star: string = '../../assets/img/1x/emptyStar.png';
  listResto: Resto[];
  
  constructor(private restoService: RestoService) {}

  getNumberOfStars(rateScore:number) {
    if (rateScore >=0 && rateScore <=5) {
      return Math.round(rateScore);
    }
  }

  hasHalfStar(ratingScore: number) {
    let integerPartRate: number = Math.trunc(ratingScore);
    let decimalPartRate: number = ratingScore - integerPartRate;
    let hasHalfStar: boolean = ((decimalPartRate >= 0 && decimalPartRate <=0.25) || (decimalPartRate >= 0.75 && decimalPartRate <1)) ? false : true;
    
    return hasHalfStar;
  }
  getNameFile(ratingScore:number) {
    let nameFile: string;
    let integerPartRate: number = Math.trunc(ratingScore);
    let decimalPartRate: number = ratingScore - integerPartRate;
    let isEmpty: boolean = (decimalPartRate >= 0 && decimalPartRate < 0.25);
    let isHalf: boolean = (decimalPartRate >= 0.25 && decimalPartRate < 0.75);
    let isFilled: boolean = (decimalPartRate >= 0.7 && decimalPartRate <1);
    let hasStar: boolean = true;
    switch (hasStar) {
      case isEmpty:
        nameFile = "/emptyStar.png";
        break;
      case isHalf:
        nameFile = "/halfStar.png";
        break;
      case isFilled:
        nameFile = "/filledStar.png";
        break;
      default:
        break;
    }
    return nameFile;
  }

  getBkgImgURL(ratingScore:number, starId: number){
    let starURL: string = "../../assets/img/1x/"
    if (starId <= ratingScore) {
      starURL += "/filledStar.png";
      return starURL;
    } else {
      let nameFile: string = this.getNameFile(ratingScore);
      starURL += nameFile;
      return starURL;
    }
  }

  setListResto(): void {
    this.listResto = this.restoService.getListResto();
  }
  

  ngOnInit() {
    this.setListResto();
  }


}
