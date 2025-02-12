import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-create-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './create-modal.component.html',
})
export class CreateModalComponent implements OnInit {
  modalService = inject(ModalService);
  authorService = inject(AuthorService);
  bookService = inject(BookService);

  modalAction = this.modalService.modalAction();
  authors = this.authorService.authors;

  error = this.bookService.error;

  public myForm!: FormGroup;

  ngOnInit(): void {
    if (this.modalAction === 'author') {
      this.myForm = new FormGroup({
        name: new FormControl(''),
        biography: new FormControl(''),
        authorId: new FormControl(''),
      });
    } else if (this.modalAction === 'book') {
      this.authorService.getAllAuthors();
      console.log('authors', this.authors());
      this.myForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        authorId: new FormControl(''),
      });
    }
  }

  closeModal() {
    this.modalService.closeModal();
    this.myForm.reset();
    this.bookService.clearError();
  }

  onSubmit(form: FormGroup) {
    console.log(this.modalAction);
    if (this.modalAction === 'author') {
      this.modalService.createNewAuthor(form.value);
    } else if (this.modalAction === 'book') {
      this.modalService.createNewBook(form.value);
    }
  }
}
