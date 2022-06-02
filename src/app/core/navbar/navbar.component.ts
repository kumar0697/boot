import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { GrowlerMessageType, GrowlerService } from "../growler/growler.service";
import { AuthService } from "../services/auth.service";
import { LoggerService } from "../services/logger.service";

@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html',

})
export class NavbarComponent implements OnInit , OnDestroy {


    isCollapsed : boolean = false;
    loginLogoutText = 'Login';
    sub : Subscription = { } as Subscription;

    constructor(private router: Router,
                private authservice: AuthService,
                private growler : GrowlerService,
                private logger : LoggerService ) { }


    ngOnInit(): void {
        this.sub = this.authservice.authChanged
          .subscribe((loggedIn : boolean) => {
              this.setLoginLogoutText();
          },
          (err:any) => this.logger.log(err));
        }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    loginOrOut() {
        const isAuthenticated = this.authservice.isAuthenticated;
        if (isAuthenticated) {
            this.authservice.logout()
            .subscribe ((status: boolean) => {
                this.setLoginLogoutText();
                this.growler.growl('Logged Out ', GrowlerMessageType.Info);
                this.router.navigate(['/customers']);
                return;
            }, 
            (err: any) => this.logger.log(err));
        }
        this.redirectToLogin();
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    setLoginLogoutText() {
        this.loginLogoutText = (this.authservice.isAuthenticated) ? 'Logout' : 'Login'
    }
}