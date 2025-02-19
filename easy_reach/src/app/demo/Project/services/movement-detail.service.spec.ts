import { TestBed } from '@angular/core/testing';

import { MovementDetailService } from './movement-detail.service';

describe('MovementDetailService', () => {
  let service: MovementDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
