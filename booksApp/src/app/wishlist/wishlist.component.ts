import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';
import { Cart } from '../cart';
import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist : Array<Wishlist> = []
  booklist : Array<Book> = []
  cart : Array<Cart> = []
  constructor(private booksdataService: BooksdataService) { }

  ngOnInit(): void {
    console.log("Username in wishlist is " + window.localStorage.getItem('username'))
    this.booksdataService.getwishlist(window.localStorage.getItem('username')).subscribe(wishlist => {
      this.wishlist = wishlist
    })

    setTimeout(()=>{
      if (this.wishlist.length > 0) {
        for (var wish of this.wishlist) {
          console.log(wish.bookid)
          this.booksdataService.getBook(wish.bookid).subscribe(book => {
            console.log(book)
            this.booklist.push(book)
          })
        }
  
      }
    },1000)


    //Loading cart 
    this.booksdataService.getcart(window.localStorage.getItem('username')).subscribe(cart=> {
      this.cart= cart
    })
 }

  showwishlist() {
    if (this.wishlist.length > 0) {
      for (var wish of this.wishlist) {
        console.log(wish.bookid)
        this.booksdataService.getBook(wish.bookid).subscribe(book => {
          console.log(book)
          this.booklist.push(book)
        })
      }

    }
  }

  getwishlist() {
    console.log("booklist length is " + this.booklist.length)
    for (var book of this.booklist){
      console.log(book.title)
    }
  }
  addtocart(id:number){
    var flag = false
    console.log("Add to cart called")
    if(this.cart.length < 3){

        for (var book of this.cart){
          if(id == book.bookid){
            flag = true
            break
          }
        }
      

      if(flag == false){
       alert("Book added to cart")
      this.booksdataService.addtocart({username : window.localStorage.getItem('username'), bookid:id}).subscribe()
      }

      else{
        alert("Book already added to cart")
      }
      
    }
    else{
      alert("Can add only 3 books to cart")
    }
    
  }

  removeFromWishlist(bookid:number){
    for(var wish of this.wishlist){
      if(bookid === wish.bookid){
        console.log(wish._id)
        this.booksdataService.removeFromWishlist(wish._id).subscribe(response=>{
          console.log(response)
        },err=>{console.log("Error in removing from wishlist"+err)})
      }
    }
  }

  rent(bookid:number){
    this.booksdataService.putRentBooks(bookid,{isRented:true,username:window.localStorage.getItem('username')}).subscribe(response=>{
      console.log(response)
    },error=>{console.log("Error in renting")})
    window.location.reload()
    this.removeFromWishlist(bookid)
  }
}
