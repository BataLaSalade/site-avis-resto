import { Injectable } from '@angular/core';
import { Resto } from '../model/Resto';
import { ListResto } from '../../assets/data/getResto';
import { Observable, of, from} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestoService {

  getListResto(): Observable<Resto[]> {
    return of (ListResto);
  }

  getResto(): Observable<Resto> {
    return from (ListResto);
  }
  
  constructor() { }
}
