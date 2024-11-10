import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './authServe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any = {
    "EmailId": "",
    "Password": ""
  };

  http = inject(HttpClient);  
  
  constructor(private router:Router, 
    private authService: AuthService ){

  }
   isLogin = false;

  onLogin() {
    // debugger;
    this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.loginObj).subscribe((res:any)=>{
      // debugger;
      if(res.result === true) { 
        // alert("Login Success");
        localStorage.setItem("angular18Login",this.loginObj.EmailId);
        this.router.navigateByUrl("dashboard")
        this.isLogin = true;
        this.authService.changeLoginStatus(this.isLogin);
        // fetchTasks();
      } else {
        alert("Check User Name or Password")
      }
    })

  }


}
