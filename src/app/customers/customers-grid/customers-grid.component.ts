import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { SorterService } from "src/app/core/services/sorter.service";
import { TrackByService } from "src/app/core/services/trackby.service";
import { ICustomer } from "src/app/shared/interfaces";

@Component({
    selector:'app-customers-grid',
    templateUrl:'./customers-grid.component.html',
    styleUrls: ['./customers-grid.component.html'],


    changeDetection : ChangeDetectionStrategy.OnPush
})
export class CustomersGridComponent implements OnInit {

    @Input() customers: ICustomer[] = [];

    constructor(private sorterService: SorterService, public trackbyService: TrackByService) { }

    ngOnInit(): void {
        
    }

    sort(prop: string) {
        this.customers = this.sorterService.sort(this.customers, prop);
    }
}