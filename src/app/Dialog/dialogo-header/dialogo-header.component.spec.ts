import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoHeaderComponent } from './dialogo-header.component';

describe('DialogoHeaderComponent', () => {
  let component: DialogoHeaderComponent;
  let fixture: ComponentFixture<DialogoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
