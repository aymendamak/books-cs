import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookListComponent } from '../../components/book-list/book-list.component';

@Component({
  selector: 'app-book',
  imports: [CommonModule, BookListComponent],
  templateUrl: './book.component.html',
})
export class BookComponent {}
