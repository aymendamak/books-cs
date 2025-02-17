import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BookComponent, canActivate: [authGuard] },
  { path: 'authors', component: AuthorComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];
