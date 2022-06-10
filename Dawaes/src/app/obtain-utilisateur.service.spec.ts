import { TestBed } from '@angular/core/testing';

import { ObtainUtilisateurService } from './obtain-utilisateur.service';

describe('ObtainUtilisateurService', () => {
  let service: ObtainUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtainUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
