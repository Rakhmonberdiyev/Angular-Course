import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../login/authServe';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
})
export class LeftSidebarComponent implements OnInit {
  @Input() isLeftSidebarCollapsed = false;
  @Output() changeIsLeftSidebarCollapsed = new EventEmitter<boolean>();
  isLogin = false;

  constructor(private authService: AuthService) {}

  items = [
    { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard' },
    { routeLink: 'products', icon: 'fal fa-box-open', label: 'Products' },
    { routeLink: 'pages', icon: 'fal fa-file', label: 'Pages' },
    { routeLink: 'settings', icon: 'fas fa-cog', label: 'Settings' },
    { routeLink: 'profile', icon: 'fas fa-user', label: 'Profile' },
  ];

  toggleCollapse(): void {
    if (this.isLogin) {
      this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed);
    }
  }

  closeSidenav(): void {
    if (this.isLogin) {
      this.changeIsLeftSidebarCollapsed.emit(true);
    }
  }

  ngOnInit(): void {
    this.authService.currentLoginStatus.subscribe((status) => {
      this.isLogin = status;
      if (!this.isLogin) {
        this.changeIsLeftSidebarCollapsed.emit(true);
      }
    });
  }
}
