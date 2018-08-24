import { TestBed, inject } from '@angular/core/testing';

import { DemandsService } from './demands.service';

describe('DemandsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemandsService]
    });
  });

  it('should be created', inject([DemandsService], (service: DemandsService) => {
    expect(service).toBeTruthy();
  }));
});
