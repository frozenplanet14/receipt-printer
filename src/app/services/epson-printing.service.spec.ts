import { TestBed } from '@angular/core/testing';

import { EpsonPrintingService } from './epson-printing.service';

describe('EpsonPrintingService', () => {
  let service: EpsonPrintingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpsonPrintingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
