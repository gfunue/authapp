import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { UserserviceService } from '../../service/userservice.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MenubarModule,
    InputTextModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  items: MenuItem[];
  constructor(
    private userService: UserserviceService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.items = [
      {
        label: 'Home',
        routerLink: ['/home'],
      },
      {
        label: 'New Blog',
        routerLink: ['/blog'],
      },
      {
        label: 'About',
        routerLink: ['/about'],
      },
      {
        label: 'Logout',
        command: () => this.onLogout(),
      },
    ];
  }

  onLogout() {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Unknown error occurred',
          life: 5000,
        });
      },
    });
  }
}
