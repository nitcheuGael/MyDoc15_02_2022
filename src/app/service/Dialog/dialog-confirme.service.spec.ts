import { TestBed } from '@angular/core/testing';

import { DialogConfirmeService } from './dialog-confirme.service';

describe('DialogConfirmeService', () => {
  let service: DialogConfirmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogConfirmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
