import { TestBed, inject } from '@angular/core/testing';

import { TramService } from './tram.service';

describe('TramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TramService]
    });
  });

  it('should be created', inject([TramService], (service: TramService) => {
    expect(service).toBeTruthy();
  }));
});
