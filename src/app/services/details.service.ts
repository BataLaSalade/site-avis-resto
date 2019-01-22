import { Injectable } from '@angular/core';
import { Rate } from "../model/Rate";
import { Details } from "../../assets/data/getDetails";

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  getDetails(): Rate[] {
    return Details;
  }
  constructor() { }
}
