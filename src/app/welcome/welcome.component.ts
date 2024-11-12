import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

   showSticker = false;

  showThumbsUp() {
    this.showSticker = true;
    setTimeout(() => {
      this.showSticker = false;
    }, 1400);
  }
}
