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

  getBkgImgURL(ratingScore:number, starId: number) {
    let starURL: string = "../../assets/img/1x/"
    let integerPartRate: number = Math.trunc(ratingScore);
    let decimalPartRate: number = ratingScore - integerPartRate;
    let numberOfStars: number;
    if (decimalPartRate>=0 && decimalPartRate<0.25) { // arrondi inf
      numberOfStars = Math.floor(ratingScore);
      starURL += (starId<=numberOfStars) ? "/filledStar.png" : "/emptyStar.png";
    } else if ((decimalPartRate>=0.25 && decimalPartRate<0.75)&&(starId>ratingScore)) { // je me 1/2
      // mais si je mets un demi-etoile, je veux une étoile vide au prochain appel (normalement sur la prochaine li)
      // or  actuellement ça me met des demi-étoiles sur les li suivante
      // j'ai mis une variable de class pour compter le nombre de fois où je rentre dans ma condition j'ai eu un nombre totalement incohérent
      // genre 1000++
      //je sais que j'ai besoin d'un flag, je sais qu'il doit être mis à jour ici a chaque appel de ma fonction
      // mais je n'arrive pas a trouver comment le faire
      starURL += "/halfStar.png";
    } else { // arrondi sup
      numberOfStars = Math.ceil(ratingScore);
      starURL += (starId<=numberOfStars) ? "/filledStar.png" : "/emptyStar.png";
    }
    return starURL;
  }

  setListResto(): void {
    this.listResto = this.restoService.getListResto();
  }
  

  ngOnInit() {
    this.setListResto();
  }


}
