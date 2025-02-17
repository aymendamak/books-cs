import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-details-modal',
  imports: [],
  templateUrl: './details-modal.component.html',
})
export class DetailsModalComponent {
  currentBook;
  constructor(public modalService: ModalService) {
    this.currentBook = this.modalService.currentBook();
  }
}
