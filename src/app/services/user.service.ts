import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  userSubject$: BehaviorSubject<Object>;

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  constructor() { 
    this.userSubject$ = new BehaviorSubject<Object>(
      new Object()
    )
  }
  
  setUserPosition(location: Object) {
    this.userSubject$.next(location)
  }

  getUserPosition(success, error) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, this.options)
    } else {
      console.log("get position --> Fail");
    }
  }
  
}
