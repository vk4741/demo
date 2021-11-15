import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartlist : Array<Cart> = []
  booklist : Array<Book> = []
  constructor(private booksdataService: BooksdataService) { }

  ngOnInit(): void {
    console.log("Username in cart is " + window.localStorage.getItem('username'))
    this.booksdataService.getcart(window.localStorage.getItem('username')).subscribe(cart => {
      this.cartlist = cart
    })

    setTimeout(()=>{
      if (this.cartlist.length > 0) {
        for (var wish of this.cartlist) {
          console.log(wish.bookid)
          this.booksdataService.getBook(wish.bookid).subscribe(book => {
            console.log(book)
            this.booklist.push(book)
          })
        }
  
      }
    },1000)
  }

  showcartlist() {
    if (this.cartlist.length > 0) {
      for (var book of this.cartlist) {
        console.log(book.bookid)
        this.booksdataService.getBook(book.bookid).subscribe(book => {
          console.log(book)
          this.booklist.push(book)
        })
      }

    }
  }

  getcartlist() {
    console.log("booklist length is " + this.booklist.length)
    for (var book of this.booklist){
      console.log(book.title)
    }
  }

  removeFromCart(bookid:number){
    for(var cart of this.cartlist){
      if(bookid === cart.bookid){
        console.log(cart._id)
        this.booksdataService.removeFromCart(cart._id).subscribe(response=>{
          console.log(response)
        },err=>{console.log("Error in removing from cart"+err)})
        window.location.reload()
      }
    }
  }
  rent(bookid:number){
    this.booksdataService.putRentBooks(bookid,{isRented:true,username:window.localStorage.getItem('username')}).subscribe(response=>{
      console.log(response)
    },error=>{console.log("Error in renting")})
    window.location.reload()
    this.removeFromCart(bookid)
  }
}




