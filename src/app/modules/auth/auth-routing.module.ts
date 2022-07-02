import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInAuthGuard } from 'src/app/guards/logged-in-auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LoggedInAuthGuard] },
    {
        path: '**',
        loadChildren: () => import('../page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
