import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';

const login = {
    path: 'login',
    component: LoginComponent
}

const register = {
    path: 'register',
    component: RegisterComponent
}

export const routes: Routes = [login, register];
