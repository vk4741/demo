import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './Book';
import { Wishlist } from './wishlist';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class BooksdataService {

  token = sessionStorage.getItem('token')
  token2 : any

  constructor(private http:HttpClient) { }

  getBooks(): Observable<Book[]> {
    this.token2 = this.token?.toString()
    // console.log("token in getBooks is : "+this.token2)
    return this.http.get<Book[]>('http://localhost:3000/books/getbooks',{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  getBook(id:any):Observable<Book>{
    this.token2 = this.token?.toString()
    return this.http.get<Book>("http://localhost:3000/books/getbook/"+id,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  putRentBooks(id: any, bookObj: any): Observable<any> {
    this.token2 = this.token?.toString()
    return this.http.put("http://localhost:3000/books/rentbook/" + id, bookObj,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  getRentBooks(username :any): Observable<Book[]>{
    this.token2 = this.token?.toString()
    return this.http.get<Book[]>('http://localhost:3000/books/getbookusername/'+username,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  addtowishlist(wishlist : any): Observable<any>{
    this.token2 = this.token?.toString()
    return this.http.post("http://localhost:3000/wishlists/addwhishlist", wishlist,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  getwishlist(username:any): Observable<Wishlist[]>{
    this.token2 = this.token?.toString()
    return this.http.get<Wishlist[]>("http://localhost:3000/wishlists/getwishlist/"+username,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  removeFromWishlist(id:any):Observable<any>{
    this.token2 = this.token?.toString()
    return this.http.delete("http://localhost:3000/wishlists/removefromwishlist/"+id,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  deleteBook(id: any): Observable<any> {
    this.token2 = this.token?.toString()
    return this.http.delete("http://localhost:3000/books/deletebook/" + id,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  addBook(User: {_id:any, title: any; author: any; category: any; isRented: boolean; }) {
    console.log(User);
    this.token2 = this.token?.toString()
    return this.http.post("http://localhost:3000/books/addbook/", User,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  editBook(id:any,User: Book): Observable<any> {
    this.token2 = this.token?.toString()
    return this.http.put("http://localhost:3000/books/updatebook/"+id, User,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }
  
  addtocart(cart : any): Observable<any>{
    this.token2 = this.token?.toString()
    return this.http.post("http://localhost:3000/carts/addcart", cart,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  getcart(username:any): Observable<Cart[]>{
    this.token2 = this.token?.toString()
    return this.http.get<Cart[]>("http://localhost:3000/carts/getcart/"+username,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }
  removeFromCart(id:any):Observable<any>{
    this.token2 = this.token?.toString()
    return this.http.delete("http://localhost:3000/carts/removefromcart/"+id,{headers:new HttpHeaders().append('x-access-token',this.token2)})
  }

  
}
