import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { LoggerService } from "src/app/core/services/logger.service";
import { CustomerEditComponent } from "../edit-customer/edit-customer.component";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CustomerEditComponent> {


    constructor(private logger: LoggerService) { }

    canDeactivate(
        component: CustomerEditComponent,
        route : ActivatedRouteSnapshot,
        state : RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        this.logger.log(` CustomerId: ${ route.parent?.params['id']} URL : ${state.url}`);

        return component.canDeactivate();
    }
 }