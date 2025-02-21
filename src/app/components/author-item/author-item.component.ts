import { Component, inject, Input } from '@angular/core';
import { Author } from '../../models/author.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-author-item',
  standalone: true,
  imports: [],
  templateUrl: 'author-item.component.html',
})
export class AuthorItemComponent {
  @Input() author!: Author;

  modalService = inject(ModalService);

  openModal() {
    this.modalService.openAuthorDetailsModal(this.author);
  }
}
