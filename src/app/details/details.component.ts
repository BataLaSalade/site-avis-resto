import { Component, OnInit } from '@angular/core';
import {DetailsService} from "../services/details.service";
import { Resto } from "../model/Resto";
import {Rate} from "../model/Rate";
import { Observable} from 'rxjs';
import { PlacesService } from '../services/places.service';
import { Location } from '../model/Location';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  resto: Resto;
  selectedResto: Resto = new Resto()
  streetViewURL: string;
  detailsObservable: Observable<any> = this.detailsService.getDetails();
  details: Rate[];
  panorama: any;

  constructor(
    private detailsService: DetailsService, 
    private placesService: PlacesService,
  ) {}


  getRandomIndex(max: number): number{
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomAvatar(): string {
    let url: string = "../../assets/img/1x/roundedAvatarFichier";
    let index: string = String(this.getRandomIndex(5));
    let extension: string = ".png";
    let randomUrl: string = url + String(index) + extension;
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
        resultPng = "filledStar.png";
    }
    else if(currentRate >= 0.25) {
        resultPng ="halfStar.png";
    }

    return starURL + resultPng
  }

  setStreetViewImg(restoLocation?: Location) {
    let lat = restoLocation.lat();
    let lng = restoLocation.lng();
    this.streetViewURL = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&heading=34&pitch=10&key=AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM`;
  
  }
  
  ngOnInit() {
    this.fetchDetails();
    this.placesService.selectedRestoSubject$.subscribe(
      resto => {
        this.selectedResto = resto;
        if (typeof resto.geometry != 'undefined') {
          this.setStreetViewImg(resto.geometry.location)
        }
      }
    )
  }
}
