import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEtablissementComponent } from './profile-etablissement.component';

describe('ProfileEtablissementComponent', () => {
  let component: ProfileEtablissementComponent;
  let fixture: ComponentFixture<ProfileEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEtablissementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
