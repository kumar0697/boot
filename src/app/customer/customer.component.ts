import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-orders',
    templateUrl: './customer.component.html'
    
})
export class CustomerComponent implements OnInit {


 
    constructor(private router : Router) { }

    ngOnInit(): void {
        
    }
}