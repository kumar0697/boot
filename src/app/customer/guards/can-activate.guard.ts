import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

@Injectable()
export class CanActivateGuard implements CanActivate {
    

    constructor ( private authService: AuthService , private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(this.authService.isAuthenticated) {
            return true;
        }

        this.authService.redirectUrl =state.url;
        this.router.navigate(['/login']);
        return false;
    }
}