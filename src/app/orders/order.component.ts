import { Component, OnInit, TrackByFunction } from "@angular/core";
import { DataService } from "../core/services/data.service";
import { TrackByService } from "../core/services/trackby.service";
import { ICustomer, IPagedResults } from "../shared/interfaces";

@Component({
    selector: 'app-orders',
    templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit { 

    customers : ICustomer[] = [] ;
    totalRecords = 0;
    pageSize = 5;

    constructor (private dataService : DataService, public trackbyService: TrackByService) { }


    ngOnInit(): void {
        this.getCustomersPage(1);
    }

    pageChanged(page: number) {
        this.getCustomersPage(page)
    }

    getCustomersPage(page: number) {
        this.dataService.getCustomerPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response : IPagedResults<ICustomer[]>) => {
            this.totalRecords = response.totalRecords;
            this.customers = response.results;
        })
    }
}