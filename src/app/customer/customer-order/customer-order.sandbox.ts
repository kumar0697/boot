import { ActivatedRoute } from "@angular/router";
import { CoreModule } from "src/app/core/core.module";
import { DataService } from "src/app/core/services/data.service";
import { getActivatedRouteWithParent, MockActivatedRoute } from "src/app/shared/mocks";
import { SharedModule } from "src/app/shared/shared.module";
import { CustomerOrderComponent } from "./customer-order.component";





const sandboxConfig ={
    imports : [ SharedModule, CoreModule],
    providers: [
        { provide: DataService, useClass : MockActivatedRoute },
        { provide: ActivatedRoute, useFactory: () => {
            const route = getActivatedRouteWithParent([{id: '1'}]);
            return route;
        }}
    ],
    label: 'Customer Order Component'
};

export default sandboxOf(CustomerOrderComponent,sandboxConfig)
.add ('With Orders', {
    template : ``
})
.add ('Without Orders', {
    template: ``,
    providers: [ { provide: ActivatedRoute, useFactory: () => {
        const route = getActivatedRouteWithParent([{ id : null }]);
        return route;
    }}]
})