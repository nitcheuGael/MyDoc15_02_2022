import { TestBed } from '@angular/core/testing';

import { ServiceBdService } from './service-bd.service';

describe('ServiceBdService', () => {
  let service: ServiceBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
