import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/user';
import { DataService } from '../data.service';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userdataService : UserdataService, private router : Router, private data : DataService) { }

  username !: string
  password !: string

  user!: User

  ngOnInit(): void {
  }

  onLoginClick(id : string){
    this.userdataService.getuser(id).subscribe(user=>{
      this.user = user
    },err=>console.log("error in fetching data"+err))
    this.data.changeusername(this.username)
    window.localStorage.setItem('username',this.username)
    this.router.navigate(['homepage'])
  }

}
