import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguratorPageComponent } from './views/configurator-page/configurator-page.component';

const routes: Routes = [
    { path: '', component: ConfiguratorPageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguratorRoutingModule { }
