import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  teamMembers = [
    { name: 'Gentang Funue', role: 'Role/Contribution' },
    { name: 'Calep', role: 'Role/Contribution' },
    { name: 'Philip', role: 'Role/Contribution' },
  ];
}
