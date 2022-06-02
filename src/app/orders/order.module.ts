import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { OrderRoutingMoodule } from "./order-routing.module";

@NgModule({
    imports : [ SharedModule, OrderRoutingMoodule],
    declarations: [ OrderRoutingMoodule.components]

})
export class OrderModule { }