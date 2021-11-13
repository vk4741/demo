import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usernameSource = new  BehaviorSubject<string>("username");
  currentUsername = this.usernameSource.asObservable()
  constructor() { }

  changeusername(username : string){
    this.usernameSource.next(username)
  }
}
