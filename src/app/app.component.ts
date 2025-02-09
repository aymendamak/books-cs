import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    ModalComponent,
    ModalComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'books-cs';

  constructor(private router: Router) {}

  public navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
