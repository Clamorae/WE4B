import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUtilisateurComponent } from './profile-utilisateur.component';

describe('ProfileUtilisateurComponent', () => {
  let component: ProfileUtilisateurComponent;
  let fixture: ComponentFixture<ProfileUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
