import { Component, Input } from '@angular/core';
import { Author } from '../../models/author.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-author-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: 'author-item.component.html',
})
export class AuthorItemComponent {
  @Input() author!: Author;
}
