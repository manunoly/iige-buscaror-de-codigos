import { TestBed, inject } from '@angular/core/testing';

import { QuerydataService } from './querydata.service';

describe('QuerydataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuerydataService]
    });
  });

  it('should be created', inject([QuerydataService], (service: QuerydataService) => {
    expect(service).toBeTruthy();
  }));
});
