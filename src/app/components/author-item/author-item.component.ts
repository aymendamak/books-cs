import { Component, Input } from '@angular/core';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-item',
  standalone: true,
  imports: [],
  templateUrl: 'author-item.component.html',
})
export class AuthorItemComponent {
  @Input() author!: Author;
}
