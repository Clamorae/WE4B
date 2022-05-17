import { TestBed } from '@angular/core/testing';

import { ObtainEtablissementListService } from './obtain-etablissement-list.service';

describe('ObtainEtablissementListService', () => {
  let service: ObtainEtablissementListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtainEtablissementListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
