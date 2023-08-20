import { TestBed } from '@angular/core/testing';

import { RazorpayServiceService } from './razorpay-service.service';

describe('RazorpayServiceService', () => {
  let service: RazorpayServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazorpayServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
