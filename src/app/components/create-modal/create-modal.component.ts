import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-create-modal',
  imports: [],
  templateUrl: './create-modal.component.html',
})
export class CreateModalComponent implements OnInit {
  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}
}
