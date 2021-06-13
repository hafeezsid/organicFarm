import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  get(key)
  {
    return localStorage.getItem(key);
  }
  set(key,value)
  {
    localStorage.setItem(key,value);
  }

 removeItem(key){
   localStorage.removeItem(key);
 }

}
