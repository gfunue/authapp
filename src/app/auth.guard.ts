import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from './service/userservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private userService: UserserviceService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
