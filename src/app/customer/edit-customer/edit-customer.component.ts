import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.sass']
})
export class CustomerEditComponent implements OnInit {
  canDeactivate(): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
      throw new Error("Method not implemented.");
  }

  constructor() { }

  ngOnInit(): void {
  }

}
