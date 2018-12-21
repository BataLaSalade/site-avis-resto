import { Injectable } from '@angular/core';
import { Resto } from './model/Resto';
import { ListResto } from './mock-resto';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  getListResto(): Resto[] {
    return ListResto;
  }
  
  constructor() { }
}
