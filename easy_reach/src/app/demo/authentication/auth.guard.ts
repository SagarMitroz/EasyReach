import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedUser = localStorage.getItem('loginuser');

  

  // If the user is logged in and trying to access the login page, redirect to the user page
  if (loggedUser !== null && state.url.includes('login')) {
    router.navigateByUrl('temperature-dashboard');  // Redirect to the user page if logged in
    return false;  // Prevent access to login page
  }

  // If the user is not logged in and trying to access a protected page, redirect to login page
  if (loggedUser === null && !state.url.includes('login')) {
    router.navigateByUrl('login');  // Redirect to login page if not logged in
    console.log('No user');
    return false;  // Prevent access to protected pages
  }

  // Allow access to the route if the user is logged in and not accessing the login page
  return true;
};
