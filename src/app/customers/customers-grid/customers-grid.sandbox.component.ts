import { RouterTestingModule } from "@angular/router/testing";
import { CoreModule } from "src/app/core/core.module";
import { customers } from "src/app/shared/mocks";
import { SharedModule } from "src/app/shared/shared.module";
import { CustomersGridComponent } from "./customers-grid.component";
import { sandboxOf } from 'angular-playground';





const sandboxConfig = {
    imports: [ SharedModule, CoreModule , RouterTestingModule],
    label : 'Customers Grid Component'
};

export default sandboxOf ( CustomersGridComponent, sandboxConfig)
.add('With Many Customers', {
    template: `<cm-customers-grid [customers]="customers"></cm-customers-grid>`,
    context: {
      customers: customers
    }
  })
  .add('With 10 Customers', {
    template: `<cm-customers-grid [customers]="customers"></cm-customers-grid>`,
    context: {
      customers: customers.slice(0, 10)
    }
  })
  .add('With 4 Customers', {
    template: `<cm-customers-grid [customers]="customers"></cm-customers-grid>`,
    context: {
      customers: customers.slice(0, 4)
    }
  })
  .add('Without Customers', {
    template: `<cm-customers-grid></cm-customers-grid>`
  });
