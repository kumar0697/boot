import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { CustomerOrderComponent } from "./customer-order/customer-order.component";
import { CustomerComponent } from "./customer.component";
import { CustomerEditComponent } from "./edit-customer/edit-customer.component";
import { CanActivateGuard } from "./guards/can-activate.guard";
import { CanDeactivateGuard } from "./guards/can-deactivate.guard";

const routes : Routes = [
    {
        path: '' ,component : CustomerComponent,
        children : [
            { path: 'orders', component: CustomerOrderComponent},
            { path: 'detail', component: CustomerDetailComponent},
            {
                path:'edit',
                component: CustomerEditComponent,
                canActivate: [ CanActivateGuard ],
                canDeactivate: [ CanDeactivateGuard]
            }
        ]
    }
]
@NgModule({

    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
    providers: [ CanActivateGuard, CanDeactivateGuard]
})
export class CustomerRoutingModule {
    static components = [ CustomerComponent, CustomerOrderComponent, CustomerDetailComponent, CustomerEditComponent]
 }