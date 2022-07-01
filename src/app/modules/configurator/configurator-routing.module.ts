import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DirectAccessGuard } from 'src/app/guards/direct-access.guard';
import { ConfiguratorPageComponent } from './views/configurator-page/configurator-page.component';
import { OrderDetailsPageComponent } from './views/order-details-page/order-details-page.component';
import { OrderHistoryPageComponent } from './views/order-history-page/order-history-page.component';
import { OrderSuccessfulPageComponent } from './views/order-successful-page/order-successful-page.component';

const routes: Routes = [
    { path: '', component: ConfiguratorPageComponent },
    { path: 'order-details', component: OrderDetailsPageComponent, canActivate: [DirectAccessGuard] },
    { path: 'order-successful', component: OrderSuccessfulPageComponent, canActivate: [DirectAccessGuard] },
    { path: 'order-history', component: OrderHistoryPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguratorRoutingModule { }
