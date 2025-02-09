import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { CreateModalComponent } from '../create-modal/create-modal.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, DetailsModalComponent, CreateModalComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  constructor(public modalService: ModalService) {}
}
