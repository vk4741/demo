import { Component, OnInit } from '@angular/core';
import { Book } from '../Book';
import { BooksdataService } from '../booksdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  bookList!: Array<Book>;
  constructor(
    private bookdataService: BooksdataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookdataService.getBooks().subscribe(
      (books) => {
        this.bookList = books;
      },
      (err) => console.log('Error in fetching data')
    );
  }

  delete(id: number) {
    this.bookdataService.deleteBook(id).subscribe();
    window.location.reload();
  }
  addnav() {
    this.router.navigate(['/addbooks']);
  }
  editnav(id: number){
    this.router.navigate(["/editbook",id])
  }
}
