import { TestBed } from '@angular/core/testing';

import { BooksdataService } from './booksdata.service';

describe('BooksdataService', () => {
  let service: BooksdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
