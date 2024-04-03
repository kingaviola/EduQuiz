import { TestBed } from '@angular/core/testing';

import { ProcessImportedDataService } from './process-imported-data.service';

describe('ProcessImportedDataService', () => {
  let service: ProcessImportedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessImportedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
