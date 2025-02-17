import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '../../services/modal.service';
import { DetailsModalComponent } from './details-modal.component';

describe('DetailsModalComponent', () => {
  let component: DetailsModalComponent;
  let fixture: ComponentFixture<DetailsModalComponent>;
  let modalService: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    modalService = jasmine.createSpyObj('ModalService', [
      'openCreateModal',
      'openDetailsModal',
    ]);

    await TestBed.configureTestingModule({
      imports: [DetailsModalComponent],
      providers: [{ provide: ModalService, useValue: modalService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
