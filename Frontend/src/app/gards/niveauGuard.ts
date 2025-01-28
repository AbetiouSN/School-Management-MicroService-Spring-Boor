import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NiveauGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const niveau = route.paramMap.get('niveau');
      if (niveau === '1' || niveau === '2') {
        return true;
      } else {
        // Redirect to a different page or show an error message
        this.router.navigate(['/login']);
        return false;
      }
  }
}
