import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrowlerMessageType, GrowlerService } from '../core/growler/growler.service';
import { AuthService } from '../core/services/auth.service';
import { LoggerService } from '../core/services/logger.service';
import { ValidationService } from '../core/services/validation.service';
import { IUserLogin } from '../shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup = {} as FormGroup;
errorMessage: string = '' ;
get f(): { [key : string]: AbstractControl } {
  return this.loginForm.controls
}
  constructor(private formBuilder : FormBuilder,
               private router : Router,
               private authService : AuthService,
               private growler : GrowlerService,
               private logger : LoggerService) { }

  ngOnInit(): void {
   this.buildForm()}

   buildForm(){
     this.loginForm = this.formBuilder.group({
       email: ['', [Validators.required, ValidationService.emailValidator]],
       password: ['', [Validators.required, ValidationService.passwordValidator]],
     })
   }

    submit({ value, valid} : {value: IUserLogin, valid : boolean}) {
      this.authService.login(value)
      .subscribe((status : boolean) => {
        if(status) {
          this.growler.growl('logged In', GrowlerMessageType.Info);
          if (this.authService.redirectUrl) {
            const redirectUrl = this.authService.redirectUrl;
            this.authService.redirectUrl = '';
            this.router.navigate([redirectUrl]);
          }else{
            this.router.navigate(['/customers'])
          }
        }else{
          const loginError = 'Unable to login';
          this.errorMessage = loginError;
          this.growler.growl(loginError,GrowlerMessageType.Danger);
        }
      },
      (err: any) => this.logger.log(err));
    }
}
