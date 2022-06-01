import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.sass']
})
export class FinanceComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  // invoice ;
  // detail ; 
  // to ;
  // amount; 

  save(form: NgForm){
    let finance = form.value
    


  }



}
