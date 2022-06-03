import { RouterTestingModule } from "@angular/router/testing";
import { CoreModule } from "src/app/core/core.module";
import { customers } from "src/app/shared/mocks";
import { SharedModule } from "src/app/shared/shared.module";
import { sandboxOf } from 'angular-playground';
import { CustomersCardComponent } from "./customers-card.component";


const sandboxConfig = {
    imports: [ SharedModule, CoreModule , RouterTestingModule],
    label : 'Customers Card Component'
};

export default sandboxOf ( CustomersCardComponent, sandboxConfig)
.add ('With Many Customers',{
    template : `<app-customers-card [customers]="customers"></app-customers-card> `,
    context: {
        customers: customers
    }
})

.add('With 10 Customers', {
    template: `<app-customers-card [customers]="customers"></app-customers-card>`,
    context: {
        customers : customers.slice(0,10)
    }
})

.add('With 4 Customers', {
    template: `<app-customers-card [customers]="customers"></app-customers-card>`,
    context: {
        customers : customers.slice(0,4)
    }
})

.add('Without Customers', {
    template: `<app-customers-card [customers]="customers"></app-customers-card>`,
});