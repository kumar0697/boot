import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomersCardComponent } from "./customers-card/customers-card.component";
import { CustomersGridComponent } from "./customers-grid/customers-grid.component";
import { CustomersComponent } from "./customers.component";


const routes : Routes = [
    { path: '', }
]


@NgModule({

    imports: [ RouterModule.forChild(routes)],
    exports : [ RouterModule ]

})
export class CustomersRoutingModule {
    static components = [ CustomersComponent, CustomersGridComponent ,CustomersCardComponent];
}