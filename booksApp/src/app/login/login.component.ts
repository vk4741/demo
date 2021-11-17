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

  constructor(private userdataService: UserdataService, private router: Router, private data: DataService) { }

  username !: string
  password !: string

  user : any = null

  ngOnInit(): void {
  }

  onSignup() {
    this.router.navigate(['userRegistration'])
  }

  onLoginClick(id: string, password: string) {
    this.userdataService.loginCheck(id, password).subscribe(user => {
      this.user = user
    })
    setTimeout(async () => {
      if (this.user.message) {
        alert(this.user.message)
      }
      else {
        console.log(this.user)
        sessionStorage.setItem('username', this.user._id)
        sessionStorage.setItem('token', this.user.token)
        if (this.user.role === 'user') {
          console.log("username stored is localstorage " + sessionStorage.getItem('username'))
          this.router.navigate(['homepage'])
        }
        else if (this.user.role === 'admin') {
          this.router.navigate(['inventory'])
        }
        else {
          this.router.navigate(['login'])
        }
      }
    }, 700)
    // this.data.changeusername(this.username)
    // sessionStorage.setItem('username',this.username)
    // this.router.navigate(['homepage'])
  }

}
