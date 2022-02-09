import { TestBed } from '@angular/core/testing';

import { Authen1Service } from './authen1.service';

describe('Authen1Service', () => {
  let service: Authen1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authen1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
