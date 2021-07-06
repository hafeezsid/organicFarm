import { TestBed } from '@angular/core/testing';

import { MatSnackService } from './mat-snack.service';

describe('MatSnackService', () => {
  let service: MatSnackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSnackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
