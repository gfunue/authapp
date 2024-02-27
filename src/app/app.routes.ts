import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';

export const routes: Routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'nav', component: NavComponent },
    { path: '', component: LoginComponent },
    { path: '**', component: ErrorpageComponent }
];
