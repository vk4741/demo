import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filterBooks = new EventEmitter();
  @Output() allBookEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  filterCategory(value:any){
    this.filterBooks.emit(value);
  }
  allbook(){
    this.allBookEvent.emit(true);
  }

}
