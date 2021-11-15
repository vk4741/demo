import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  username !: string
  testusername !: string 
  constructor(private  data: DataService) { }

  ngOnInit(): void {
    this.data.currentUsername.subscribe(username =>this.username = username)
    console.log("Username from homepage "+ window.localStorage.getItem('username'))
  }

}
