import { TestBed } from '@angular/core/testing';

import { ObtainCommentairesService } from './obtain-commentaires.service';

describe('ObtainCommentairesService', () => {
  let service: ObtainCommentairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtainCommentairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
