import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { ICustomer, IOrder } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
})
export class CustomerOrderComponent implements OnInit {

  orders : IOrder[] = [];
  customer: ICustomer = {} as ICustomer;


  constructor(private route : ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.dataService.getCustomer(id).subscribe((customer : ICustomer) => {
        this.customer = customer;
      });
    });
  }

  ordersTrackBy(index : number, orderItem : any) {
    return index;
  }

}
