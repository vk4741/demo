import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BooksdataService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books/getbooks')
  }

  putRentBooks(id: number, bookObj: any): Observable<any> {
    return this.http.put("http://localhost:3000/books/rentbook/" + id, bookObj)
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete("http://localhost:3000/books/deletebook/" + id)
  }

  addBook(User: {_id:any, title: any; author: any; category: any; isRented: boolean; }) {
    console.log(User);
    return this.http.post("http://localhost:3000/books/addbook/", User)
  }

  getBook(id:number): Observable<Book> {
    return this.http.get<Book>('http://localhost:3000/books/getbook/'+id)
  }

  editBook(id:number,User: Book): Observable<any> {
    return this.http.put("http://localhost:3000/books/updatebook/"+id, User)
  }


}


