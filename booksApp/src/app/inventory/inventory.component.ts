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
  sID!:number
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

  delete() {
  
      this.bookdataService.deleteBook(this.sID).subscribe();
      
      window.location.reload();
      alert("Book deleted successfully = " +this.sID)
    
   
  }
  addnav() {
    this.router.navigate(['/addbooks']);
  }
  editnav(id: number){
    this.router.navigate(["/editbook",id])
  }
  saveID(saveID:number){
    this.sID=saveID
  }
}
