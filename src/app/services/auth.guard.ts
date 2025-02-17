import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(LoginService);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to login page
  router.navigate(['/login']);
  return false;
};
