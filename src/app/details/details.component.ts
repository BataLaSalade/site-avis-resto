import { Component, OnInit, Input } from '@angular/core';
import {DetailsService} from "../services/details.service";
import { Resto } from "../model/Resto";
import {Rate} from "../model/Rate";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @Input() resto: any;
  @Input() isShowDetails: boolean;
  @Input() selectedResto: Resto;
  detailsObservable: Observable<any> = this.detailsService.getDetails();
  details: Rate[];

  constructor(private detailsService: DetailsService) { }

getRandomIndex(max: number): number{
  return Math.floor(Math.random() * Math.floor(max));
}

getRandomAvatar(): string {
  let url: string = "../../assets/img/1x/roundedAvatarFichier";
  let index: string = String(this.getRandomIndex(5));
  let extension: string = ".png"
  let randomUrl: string = url + String(index) + extension
  return randomUrl
}

  fetchDetails(): void {
    this.detailsObservable
      .subscribe(details => this.details = details);
    
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

  getUrlPhotoRequest(resto: any) {
    if (typeof resto.photos == "undefined") {
        let defaultImg: string = "../../assets/img/1x/emptyStar.png";

        return defaultImg;
    } else {
        let firstPart: string = "https://maps.googleapis.com/maps/api/place/photo"
        let maxWidthKey: string = "?maxwidth=";
        let maxWidthValue: string = String(resto.photos[0].width);
        let photoReferenceKey: string = "&photoreference=";
        let photoReferenceValue: string = resto.photos[0].photo_reference;
        let keyKey: string = "&key=";
        let keyValue: string = "AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM";
        let url: string = firstPart+maxWidthKey+maxWidthValue+photoReferenceKey+photoReferenceValue+keyKey+keyValue    
        
        return url;
    }  
  }

  ngOnInit() {
    this.fetchDetails()
  }

}
