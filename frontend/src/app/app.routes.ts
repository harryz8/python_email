import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const home = {
    path: '',
    component: HomeComponent
}

const login = {
    path: 'login',
    component: LoginComponent
}

const register = {
    path: 'register',
    component: RegisterComponent
}

export const routes: Routes = [home, login, register];
