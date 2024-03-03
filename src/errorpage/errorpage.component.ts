import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-errorpage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './errorpage.component.html',
  styleUrl: './errorpage.component.css'
})

export class ErrorpageComponent {

}
