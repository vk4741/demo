import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';
import { Wishlist } from '../wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist : Array<Wishlist> = []
  booklist : Array<Book> = []
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

}
