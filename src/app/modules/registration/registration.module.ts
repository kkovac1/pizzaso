import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistartionPageComponent } from './views/registartion-page/registartion-page.component';
import { RegistrationRoutingModule } from './registration-routing.module';



@NgModule({
  declarations: [
    RegistartionPageComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
