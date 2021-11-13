import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/user';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private  http : HttpClient) { }

  getuser(id: string):Observable<User>{
    return  this.http.get<User>('http://localhost:3000/users/getuser/'+id)
  }
}


