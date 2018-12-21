import { Injectable } from '@angular/core';
import { User } from "../app/model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  
  getUserPosition(success, error) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, this.options)
    } else {
      console.log("get position --> Fail");
    }
  }
  constructor() { }
}
