import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { timeStamp } from 'console';
import { takeWhile } from 'rxjs';
import { GrowlerMessageType, GrowlerService } from 'src/app/core/growler/growler.service';
import { IModalContent, ModalService } from 'src/app/core/modal/modal.service';
import { DataService } from 'src/app/core/services/data.service';
import { LoggerService } from 'src/app/core/services/logger.service';
import { ICustomer, IState } from 'src/app/shared/interfaces';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.sass']
})
export class CustomerEditComponent implements OnInit {

  customer: ICustomer = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    city: '',
    state: {
      abbreviation: '',
      name: '',
    },
  };

  states: IState[] = [];
  errorMessage: string = '';
  deleteMessageEnabled: boolean = false;
  operationText = 'Insert';
  @ViewChild('customerForm', { static: true }) customerForm: NgForm = {} as NgForm;



  constructor(private router: Router,
    private route: ActivatedRoute,
    private growler: GrowlerService,
    private modalService: ModalService,
    private logger: LoggerService,
    private dataService: DataService) { }

  ngOnInit(){

    this.route.parent?.params.subscribe((params: Params) => {
      cosnt id = +params['id'];
      if (id !== 0) {
        this.operationText = 'Update';
        this.getCustomer(id);
      }
    });

    this.dataService.getStates().subscribe((states: IState[]) => this.states = states)
  }

  getCustomer(id: number) {
    this.dataService.getCustomer(id).subscribe((customer: ICustomer) => {
      this.customer = customer;
    })
  }

  submit() {

    if (this.customer.id === 0) {

      this.dataService.insertCustomer(this.customer)
        .subscribe((insertedCustomer: ICustomer) => {
          if (insertedCustomer) {
//
//
            this.customerForm.form.markAsPristine();
            this.router.navigate(['/customers']);
          } else {
            const msg = "Unable to insert customer";
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;
          }
        },
          (err: any) => this.logger.log(err));
    } else {
      this.dataService.updateCustomer(this.customer)
        .subscribe((status: boolean) => {

          if (status) {

            this.customerForm.form.markAsPristine();
            this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
          } else {
            const msg = 'Unable to update Customer';
            this.growler.growl(msg, GrowlerMessageType.Danger);
            this.errorMessage = msg;

          }
        },
          (err: any) => this.logger.log(err));
    }

  } 

  cancel (event: Event) {
    event.preventDefault() ;
//
    this.router.navigate(['.customers']);
  }

  delete(event : Event) {
    event.preventDefault () ;
    this.dataService.deleteCustomer(this.customer.id)
    .subscribe((status: boolean) => {
      if(status) {
        this.router.navigate(['./customers']);
      }else{
        this.errorMessage = 'Unable to delete customer'
      }
    },
    (err) => this.logger.log(err));
  }


    canDeactivate(): Promise<boolean>  | boolean {

      if(!this.customerForm.dirty) {
      return true;
    }

    const modalContent: IModalContent = {
      header: " Lose Unsaved Changes?",
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: "Leave"
    };

    return this.modalService.show(modalContent);
  }
}
