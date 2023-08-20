import { TestBed } from '@angular/core/testing';

import { AgoraServicesService } from './agora-services.service';

describe('AgoraServicesService', () => {
  let service: AgoraServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgoraServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
