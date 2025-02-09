import { Component } from '@angular/core';
import { AuthorListComponent } from '../../components/author-list/author-list.component';

@Component({
  selector: 'app-author',
  imports: [AuthorListComponent],
  templateUrl: './author.component.html',
})
export class AuthorComponent {}
