import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [ CustomerRoutingModule, SharedModule],
    declarations: [CustomerRoutingModule.components, CustomerEditComponent]
})
export class CustomerModule { }