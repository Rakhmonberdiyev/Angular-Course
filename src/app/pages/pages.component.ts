import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css',
})
export class PagesComponent {}
