import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [ LoginRoutingModule.components],
  imports: [
    ReactiveFormsModule,SharedModule, LoginRoutingModule
  ]
})
export class LoginModule { }
