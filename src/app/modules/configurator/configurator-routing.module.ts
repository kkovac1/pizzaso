import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectAccessGuard } from 'src/app/guards/direct-access.guard';
import { ConfiguratorResolver } from './resolvers/configurator.resolver';
import { ConfiguratorPageComponent } from './views/configurator-page/configurator-page.component';
import { OrderDetailsPageComponent } from './views/order-details-page/order-details-page.component';
import { OrderSuccessfulPageComponent } from './views/order-successful-page/order-successful-page.component';

const routes: Routes = [
    { path: '', component: ConfiguratorPageComponent },
    { path: 'order-details', component: OrderDetailsPageComponent, canActivate: [DirectAccessGuard] },
    { path: 'order-successful', component: OrderSuccessfulPageComponent, canActivate: [DirectAccessGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguratorRoutingModule { }
