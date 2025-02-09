import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { AuthorItemComponent } from '../author-item/author-item.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-author-list',
  imports: [CommonModule, AuthorItemComponent],
  templateUrl: './author-list.component.html',
})
export class AuthorListComponent {
  authorService = inject(AuthorService);
  modalService = inject(ModalService);

  openCreateModal() {
    this.modalService.openCreateModal();
  }
}
