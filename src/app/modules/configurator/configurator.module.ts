import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorPageComponent } from './views/configurator-page/configurator-page.component';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ConfiguratorPageComponent,
  ],
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    SharedModule
  ]
})
export class ConfiguratorModule { }
