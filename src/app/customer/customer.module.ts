import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from "./customer-routing.module";

@NgModule({
    imports: [ CustomerRoutingModule, SharedModule],
    declarations: [CustomerRoutingModule.components]
})
export class CustomerModule { }