import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogzoneComponent } from './logzone.component';

describe('LogzoneComponent', () => {
  let component: LogzoneComponent;
  let fixture: ComponentFixture<LogzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogzoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
