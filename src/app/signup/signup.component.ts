import { Component, inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpObj: any = {
    "userId": 0,
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "mobileNo": "",
    "emailId": "",
    "altMobileNo": "",
    "password": ""

  };
  Obj: any = {
    "confirmPassword": "",
  }

  http = inject(HttpClient);

  constructor(private router: Router) { }

  signUp() {
    if (!this.signUpObj.firstName || !this.signUpObj.lastName || !this.signUpObj.mobileNo || !this.signUpObj.emailId || !this.signUpObj.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (this.signUpObj.password !== this.Obj.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    this.signUpObj.altMobileNo = this.signUpObj.mobileNo
    this.signUpObj.userId = this.signUpObj.mobileNo
  
    // console.log(this.signUpObj);
    this.http.post("https://freeapi.miniprojectideas.com/api/User/CreateNewUser", this.signUpObj)
      .subscribe((res: any) => {
        console.log(res); 
        if (res.result) {
          alert("Sign-up Successful! Please log in.");
          this.router.navigateByUrl("/login");
        } else {
          alert("Sign-up failed. Please try again.");
        }
        (error: any) => {
          console.error('Error occurred:', error); 
          alert("An error occurred. Please try again.");
        }
      });

    console.log(this.signUpObj)
  }
}
