/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Resto } from "../model/Resto";
import {Rate} from "../model/Rate";
import { PlacesService } from '../services/places.service';
import { Location } from '../model/Location';
import { MatDialog } from '@angular/material';
import { ReviewDialogComponent } from '../review-dialog/review-dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

  resto: Resto;
  selectedResto: Resto = new Resto()
  streetViewURL: string;
  details: Rate[] = new Array<Rate>();
  map: google.maps.Map;
  newReview: Rate;

  constructor(
    private placesService: PlacesService,
    private dialog: MatDialog
  ) {}

  callBackGetDetails(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.details = results.reviews;
    }
  }

  getDetails(placeId: string, map: google.maps.Map) {
    if (typeof placeId != 'undefined') {
      let service = new google.maps.places.PlacesService(map);
      let request = {
        placeId: placeId,
        fields: ['reviews']
      }
      service.getDetails(request, this.callBackGetDetails.bind(this));
    }
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

  openReviewDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.newReview = new Rate(result.id, result.note, "à l'instant", result.comment);
      this.details.push(this.newReview);
    });
  }
  
  ngOnInit() {

    this.placesService.mapSubject$.subscribe(
      map => {
        this.map = map;
      }
    );

    this.placesService.selectedRestoSubject$.subscribe(
      resto => {
        this.selectedResto = resto;
        this.getDetails(resto.place_id, this.map);
        if (typeof resto.geometry != 'undefined') {
          this.setStreetViewImg(resto.geometry.location);
        }
      }
    )
  }
}
