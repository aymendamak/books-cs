import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BookComponent },
  { path: 'authors', component: AuthorComponent },
];
