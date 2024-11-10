import { NgClass, NgIf } from '@angular/common';
import { Component, input, output, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../login/authServe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, RouterLinkActive, RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  dropdownOpen = false;
  isCollapsed = false;
  isLogin = false;
  
  constructor( private router:Router, 
    private authService: AuthService) {
    // this.translate.setDefaultLang('en'); 
  }  

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  closeSidebar() {
    this.isCollapsed = true;
  }

  // switchLanguage(language: string) {
  //   this.translate.use(language);
  //   this.dropdownOpen = false;
  // }

  search() {
    console.log("Search clicked");
  }
  


  ngOnInit() {
    this.authService.currentLoginStatus.subscribe((status) => {
      this.isLogin = status;
    });
  }
  onLogout() {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      this.isLogin = false; 
      this.authService.changeLoginStatus(this.isLogin); 
      localStorage.removeItem("angular18Login");
      this.router.navigateByUrl("login")
    }
  }
}
