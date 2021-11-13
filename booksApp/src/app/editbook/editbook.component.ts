import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {

  book : Book;
  bookid:any;

  constructor(
    private bookdataService: BooksdataService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.book =new Book()
    this.activatedRoute.params.subscribe(newp=>{
      this.bookid=parseInt(newp['id']);})
  }

  ngOnInit(): void {
    this.bookdataService.getBook(this.bookid).subscribe(
      (book) => {
        this.book = book;
      },
      (err) => console.log('Error in fetching data')
    );
  }

  toInventory() {
    this.router.navigate(['inventory']);
  }

  update(){
    this.bookdataService.editBook(this.bookid,this.book).subscribe()
    this.toInventory()
  }
}
