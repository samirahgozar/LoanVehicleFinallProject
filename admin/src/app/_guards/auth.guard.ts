import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../_Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router
    ) {}
    canActivate(): boolean {
        const token = localStorage.getItem("token");
        if (token && !this.jwtHelper.isTokenExpired(token)){
          return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
    // if (this.authService.loggedIn()) {
    // return true;
    // }
    // this.router.navigate(['/auth/login']);
    // return false;
    }
}
