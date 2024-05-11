import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const r = inject(Router);
  return inject(AuthService).checkAuth().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        r.navigateByUrl('/login');
        return false;
      }
    }),
    catchError(() => {
      r.navigateByUrl('/login');
      return of(false);
    })
  );
}
