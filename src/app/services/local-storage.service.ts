import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  // Keys
  usersKey: string = 'US3RK3Y'; //coloco com outras strings para não conflitar com outros projetos (localhost);


  constructor() { }

  
  getItem(key:string, obj:boolean = false){
    let data;
    if (obj){
      return JSON.parse(window.localStorage.getItem(key) || 'null');
    } else {
      return window.localStorage.getItem(key);
    }
  }

  setItem(key:string, item:any, obj: boolean = false){
    if (obj){
      window.localStorage.setItem(key, JSON.stringify(item));
    } else {
      window.localStorage.setItem(key, item);
    }    
  }

  removeItem(key:string){
    window.localStorage.removeItem(key);
  }


}
