import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

import { BlogComponent } from './components/blog/blog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogDetailComponent },
  { path: 'update-blog/:id', component: UpdateBlogComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },

import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: ErrorpageComponent }
];
