import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { AuthorItemComponent } from '../author-item/author-item.component';
import { ModalService } from '../../services/modal.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-list',
  imports: [CommonModule, AuthorItemComponent],
  templateUrl: './author-list.component.html',
})
export class AuthorListComponent {
  authorService = inject(AuthorService);
  modalService = inject(ModalService);
  authors = this.authorService.authors;

  ngOnInit() {
    this.authorService.getAllAuthors();
  }

  openCreateModal() {
    this.modalService.openCreateModal('author');
  }

  openDetailsModal(author: Author) {
    // this.modalService.openDetailsModal();
  }
}
