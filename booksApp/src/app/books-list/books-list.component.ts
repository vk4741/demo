import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';
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
      }

      else{
        alert("Book already added to wishlist")
      }
      
    }
    else{
      alert("Can add only 3 books to wishlist")
    }
    
  }

}
