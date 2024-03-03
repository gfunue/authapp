import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { ErrorpageComponent } from '../errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'blog-home',
    component: BlogHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blog/:id',
    component: BlogDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-blog/:id',
    component: UpdateBlogComponent,
    canActivate: [AuthGuard],
  },
  { path: '404', component: ErrorpageComponent },
  { path: '**', redirectTo: '/404' },
];
