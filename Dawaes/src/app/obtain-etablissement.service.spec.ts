import { TestBed } from '@angular/core/testing';

import { ObtainEtablissementService } from './obtain-etablissement.service';

describe('ObtainEtablissementService', () => {
  let service: ObtainEtablissementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtainEtablissementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
