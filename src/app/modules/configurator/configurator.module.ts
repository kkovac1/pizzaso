import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorPageComponent } from './views/configurator-page/configurator-page.component';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ConfiguratorService } from './services/configurator.service';
import { OrderDetailsPageComponent } from './views/order-details-page/order-details-page.component';
import { ToppingComponent } from './components/topping/topping.component';
import { OrderSuccessfulPageComponent } from './views/order-successful-page/order-successful-page.component';
import { OrderHistoryPageComponent } from './views/order-history-page/order-history-page.component';
import { DialogComponent } from './components/dialog/dialog.component';



@NgModule({
  declarations: [
    ConfiguratorPageComponent,
    OrderDetailsPageComponent,
    ToppingComponent,
    OrderSuccessfulPageComponent,
    OrderHistoryPageComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    ConfiguratorRoutingModule,
    SharedModule
  ],
  providers: [
    ConfiguratorService
  ]
})
export class ConfiguratorModule { }
