import { RouterTestingModule } from "@angular/router/testing";
import { CoreModule } from "../core/core.module";
import { DataService } from "../core/services/data.service";
import { MockDataService } from "../shared/mocks";
import { SharedModule } from "../shared/shared.module";
import { CustomersCardComponent } from "./customers-card/customers-card.component";
import { CustomersGridComponent } from "./customers-grid/customers-grid.component";
import { CustomersComponent } from "./customers.component";

const  sandboxConfig = {
    imports: [ SharedModule, CoreModule, RouterTestingModule],
    declarations: [ CustomersCardComponent,CustomersGridComponent],
    providers: [
        {provide: DataService, useClass : MockDataService}
    ],
    label : 'Customers Component'
};

export default sandboxConfig( CustomersComponent, sandboxConfig)
.add ('With Customers',{
    template: `<app-customers></app-customers>`
});