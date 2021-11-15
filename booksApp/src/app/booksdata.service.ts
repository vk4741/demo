import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './Book';
import { Wishlist } from './wishlist';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class BooksdataService {

  constructor(private http:HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books/getbooks')
  }

  getBook(id:number):Observable<Book>{
    return this.http.get<Book>("http://localhost:3000/books/getbook/"+id)
  }

  putRentBooks(id: number, bookObj: any): Observable<any> {
    return this.http.put("http://localhost:3000/books/rentbook/" + id, bookObj)
  }

  getRentBooks(username :any): Observable<Book[]>{
    return this.http.get<Book[]>('http://localhost:3000/books/getbookusername/'+username)
  }

  addtowishlist(wishlist : any): Observable<any>{
    return this.http.post("http://localhost:3000/wishlists/addwhishlist", wishlist)
  }

  getwishlist(username:any): Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>("http://localhost:3000/wishlists/getwishlist/"+username)
  }

  removeFromWishlist(id:any):Observable<any>{
    return this.http.delete("http://localhost:3000/wishlists/removefromwishlist/"+id)
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete("http://localhost:3000/books/deletebook/" + id)
  }

  addBook(User: {_id:any, title: any; author: any; category: any; isRented: boolean; }) {
    console.log(User);
    return this.http.post("http://localhost:3000/books/addbook/", User)
  }

  editBook(id:number,User: Book): Observable<any> {
    return this.http.put("http://localhost:3000/books/updatebook/"+id, User)
  }
  
  addtocart(cart : any): Observable<any>{
    return this.http.post("http://localhost:3000/carts/addcart", cart)
  }

  getcart(username:any): Observable<Cart[]>{
    return this.http.get<Cart[]>("http://localhost:3000/carts/getcart/"+username)
  }
  removeFromCart(id:any):Observable<any>{
    return this.http.delete("http://localhost:3000/carts/removefromcart/"+id)
  }

  
}
