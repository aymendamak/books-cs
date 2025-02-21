import { Component, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details-modal',
  imports: [CommonModule],
  templateUrl: './details-modal.component.html',
})
export class DetailsModalComponent {
  modalService = inject(ModalService);
  currentBook = this.modalService.currentBook();
  currentAuthor = this.modalService.currentAuthor();
}
