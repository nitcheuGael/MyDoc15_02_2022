import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmActionComponent } from './dialog-confirm-action.component';

describe('DialogConfirmActionComponent', () => {
  let component: DialogConfirmActionComponent;
  let fixture: ComponentFixture<DialogConfirmActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
