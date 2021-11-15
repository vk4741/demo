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

  loginCheck(username: string, password: string): Observable<User>{
    return this.http.post<User>('http://localhost:3000/users/login',{username:username,password:password})
  }

  addUser(data:any): Observable<any>{
    return this.http.post('http://localhost:3000/users/adduser',data)
  }
}


