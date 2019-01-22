import { Injectable } from '@angular/core';
import { Resto } from '../model/Resto';
import { ListResto } from '../../assets/data/getResto';


@Injectable({
  providedIn: 'root'
})
export class RestoService {

  getListResto(): Resto[] {
    return ListResto;
  }
  
  constructor() { }
}
