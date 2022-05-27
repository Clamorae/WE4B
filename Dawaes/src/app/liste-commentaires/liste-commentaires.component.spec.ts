import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommentairesComponent } from './liste-commentaires.component';

describe('ListeCommentairesComponent', () => {
  let component: ListeCommentairesComponent;
  let fixture: ComponentFixture<ListeCommentairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCommentairesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCommentairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
