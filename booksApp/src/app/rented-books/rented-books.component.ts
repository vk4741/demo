import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rented-books',
  templateUrl: './rented-books.component.html',
  styleUrls: ['./rented-books.component.css']
})
export class RentedBooksComponent implements OnInit {


  username !:string
  booksList !: Array<Book>
  constructor(private data :  DataService, private bookdataService : BooksdataService) { }

  ngOnInit(): void {
    this.data.currentUsername.subscribe(username =>this.username = username)
    console.log('username from rented books '+window.localStorage.getItem('username'))
    this.bookdataService.getRentBooks(window.localStorage.getItem('username')).subscribe(books =>{
      this.booksList = books
    },err=>console.log('error in fetching data'+err))
  }

  returnBook(id:any){
    this.bookdataService.putRentBooks(id,{isRented:false,username:""}).subscribe()
    window.location.reload()
  }

}
