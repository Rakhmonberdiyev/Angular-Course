import { NgClass } from '@angular/common';
import { Component , input} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgClass],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  isChecked = true;

  onCheckboxChange(): void {
    this.isChecked = !this.isChecked
    console.log('hi')
  }
}
