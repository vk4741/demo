import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';
import { Cart } from '../cart';
import { DataService } from '../data.service';
import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  username !:string
  booksList !: Array<Book>
  wishlist : Array<Wishlist> = []
  cart : Array<Cart> = []
  constructor(private  bookdataService : BooksdataService, private data :  DataService) { }

  ngOnInit(): void {
    this.data.currentUsername.subscribe(username =>this.username = username)

    this.bookdataService.getBooks().subscribe(books=>{
      this.booksList = books
    },err => console.log("Error in fetching books"+err))
    console.log("Username  from booklist"+ window.localStorage.getItem('username'))

    this.bookdataService.getwishlist(window.localStorage.getItem('username')).subscribe(wishlist => {
      this.wishlist = wishlist
      console.log(this.wishlist)
    })
    this.bookdataService.getcart(window.localStorage.getItem('username')).subscribe(cart=> {
      this.cart = cart
      console.log("Here"+this.cart)
    })
  }

  rentBook(id:number){
    this.bookdataService.putRentBooks(id,{isRented:true,username:window.localStorage.getItem('username')}).subscribe()
    window.location.reload()
  }

  addtowishlist(id:number){
    var flag = false
    console.log("Add to wishlist called")
    if(this.wishlist.length < 3){

        for (var wish of this.wishlist){
          if(id == wish.bookid){
            flag = true
            break
          }
        }
      

      if(flag == false){
       alert("Book added to wishlist")
      this.bookdataService.addtowishlist({username : window.localStorage.getItem('username'), bookid:id}).subscribe()
      window.location.reload()
      }

      else{
        alert("Book already added to wishlist")
      }
      
    }
    else{
      alert("Can add only 3 books to wishlist")
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
      this.bookdataService.addtocart({username : window.localStorage.getItem('username'), bookid:id}).subscribe()
      }

      else{
        alert("Book already added to cart")
      }
      
    }
    else{
      alert("Can add only 3 books to cart")
    }
    
  }

}
