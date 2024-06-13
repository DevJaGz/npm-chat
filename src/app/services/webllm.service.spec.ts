import { TestBed } from '@angular/core/testing';

import { WebllmService } from './webllm.service';

describe('WebllmService', () => {
  let service: WebllmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebllmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
