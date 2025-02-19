import { TestBed } from '@angular/core/testing';

import { DisplayAssetService } from './display-asset.service';

describe('DisplayAssetService', () => {
  let service: DisplayAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
