import { TestBed } from '@angular/core/testing';

import { ObservableServiceService } from './observable.service';

describe('ObservableServiceService', () => {
  let service: ObservableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
