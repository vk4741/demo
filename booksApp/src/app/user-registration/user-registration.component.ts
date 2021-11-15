import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  _id !: string
  fname !: string
  lname !: string
  email !: string
  password !: string
  role : string = 'user'

  constructor(private userdataService : UserdataService, private router : Router) { }

  ngOnInit(): void {
  }

  submit(){
    this.userdataService.addUser({_id:this._id,fname:this.fname,lname:this.lname,password:this.password,email:this.email,role:this.role}).subscribe(user=>{
      console.log(user)
      alert("user added successfully"+user)
      this.router.navigate(['login'])
    },err=>alert('Error in adding user'+err))
  }

}
