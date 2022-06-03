import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { TrackByService } from "src/app/core/services/trackby.service";
import { ICustomer } from "src/app/shared/interfaces";

@Component({
    selector: 'app-customers-card',
    templateUrl: './customers-card.component.html',
    styleUrls : ['./customers-card.component.html'],


    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersCardComponent implements OnInit {

    @Input() customers: ICustomer[] = [];

    constructor( public trackbyService : TrackByService) { }

    ngOnInit(): void {
        
    }
}