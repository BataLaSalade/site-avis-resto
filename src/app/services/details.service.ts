import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { Rate } from "../model/Rate";
import { Details } from "../../assets/data/getDetails";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor() {
    this.subject = new BehaviorSubject(
      new Array<Rate>()
    );
   }
  subject: BehaviorSubject<Rate[]>;

  getDetails(): Observable<Rate[]> {
    this.subject.next(Details)
    return this.subject.asObservable();
  }
  
}
