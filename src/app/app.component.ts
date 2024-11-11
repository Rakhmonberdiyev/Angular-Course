import { Component, HostListener, OnInit, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthService } from './login/authServe';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeftSidebarComponent, NavbarComponent, RouterOutlet, WelcomeComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);
  isLogin = true

  constructor(
    private authService: AuthService) {
 
  }  

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
    this.authService.currentLoginStatus.subscribe((status) => {
      this.isLogin = status;
    });
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
  
}
