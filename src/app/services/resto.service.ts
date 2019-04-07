import { Injectable } from '@angular/core';
import { Resto } from '../model/Resto';
import { ListResto } from '../../assets/data/getResto';
import { Observable, from, BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestoService {
  subject: BehaviorSubject<Resto[]>;

  constructor() { 
    this.subject = new BehaviorSubject(
      new Array<Resto>()
    )
  }
  
  getListResto(): Observable<Resto[]> {
    this.subject.next(ListResto)
    return this.subject.asObservable();
  }

  getResto(): Observable<Resto> {
    return from (ListResto);
  }
  
  
}
