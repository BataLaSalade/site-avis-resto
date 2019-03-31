import { Component, OnInit, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit, OnChanges } from '@angular/core';
import {DetailsService} from "../services/details.service";
import { Resto } from "../model/Resto";
import {Rate} from "../model/Rate";
import { Observable } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
import { google } from '@agm/core/services/google-maps-types';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('streetviewMap') streetviewMap: any;
  @ViewChild('streetviewPano') streetviewPano: any;

  @Input() resto: any;
  @Input() isShowDetails: boolean;
  @Input() selectedResto: any;
  
  detailsObservable: Observable<any> = this.detailsService.getDetails();
  details: Rate[];
  panorama: any;

  constructor(
    private detailsService: DetailsService, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    private mapsAPILoader: MapsAPILoader
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

  getUrlPhotoRequest(resto: any) {
    if (typeof resto.photos == "undefined") {
        let defaultImg: string = "../../assets/img/1x/emptyStar.png";

        return defaultImg;
    } else {
        let firstPart: string = "https://maps.googleapis.com/maps/api/place/photo";
        let maxWidthKey: string = "?maxwidth=";
        let maxWidthValue: string = String(resto.photos[0].width);
        let photoReferenceKey: string = "&photoreference=";
        let photoReferenceValue: string = resto.photos[0].photo_reference;
        let keyKey: string = "&key=";
        let keyValue: string = "AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM";
        let url: string = firstPart+maxWidthKey+maxWidthValue+photoReferenceKey+photoReferenceValue+keyKey+keyValue;
        
        return url
    }  
  }

  displayStreetViewPanorama() {
    if(isPlatformBrowser(this.platformId)){
      this.mapsAPILoader.load().then(() => {
        if (typeof this.selectedResto != "undefined") {
          let center = { lat: this.selectedResto.geometry.location.lat, lng: this.selectedResto.geometry.location.lng };
          let map = new window['google'].maps.Map(this.streetviewMap.nativeElement, { center: center, zoom: 15, scrollwheel: false });
          let panorama = new window['google'].maps.StreetViewPanorama(
            this.streetviewPano.nativeElement, {
              position: center,
              pov: { heading: 34, pitch: 10 },
              scrollwheel: false
            });
          map.setStreetView(panorama);
        }
        
      });
    }
  }

  ngOnInit() {
    this.fetchDetails();
  }

  ngAfterViewInit(){
  }
  
  ngOnChanges(){
    this.displayStreetViewPanorama();
  }
}
